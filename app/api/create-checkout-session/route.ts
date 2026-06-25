import { NextResponse } from "next/server";
import { stripe } from "./../../lib/stripe";
import { adminDb } from "../../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { uid, email, plan } = await req.json();

    if (!uid || !email || !plan) {
      return NextResponse.json(
        { error: "Missing uid, email, or plan" },
        { status: 400 }
      );
    }

    const priceId =
      plan === "monthly"
        ? process.env.STRIPE_MONTHLY_PRICE_ID
        : process.env.STRIPE_YEARLY_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing Stripe price ID" },
        { status: 500 }
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    let stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          firebaseUID: uid,
        },
      });

      stripeCustomerId = customer.id;

      await userRef.set(
        {
          email,
          stripeCustomerId,
        },
        { merge: true }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/choose-plan`,
      metadata: {
        firebaseUID: uid,
        plan,
      },
      subscription_data: {
        metadata: {
          firebaseUID: uid,
          plan,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { stripe } from "./../../lib/stripe";
import { adminDb } from "../../lib/firebaseAdmin";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature error:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("Received Stripe event:", event.type);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const uid = session.metadata?.firebaseUID;
    console.log("Checkout session completed for UID:", uid);
    const plan = session.metadata?.plan;
    console.log("Checkout session completed for plan:", plan);

    if (uid) {
      await adminDb.collection("users").doc(uid).set(
      {
        plan: "premium",
        isPremium: true,
        subscriptionStatus: "active",
      },
      { merge: true }
    );
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;

    const uid = subscription.metadata?.firebaseUID;
    console.log("Subscription event received for UID:", uid);
    const plan = subscription.metadata?.plan;
    console.log("Subscription event received for plan:", plan);

    const isActive =
      subscription.status === "active" ||
      subscription.status === "trialing";

    if (uid) {
      await adminDb.collection("users").doc(uid).set(
        {
          plan: isActive ? plan : "free",
          
        },
        { merge: true }
      );
    }
  }

  return NextResponse.json({ received: true });
}
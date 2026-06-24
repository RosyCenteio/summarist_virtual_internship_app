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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const uid = session.metadata?.firebaseUID;
    const plan = session.metadata?.plan;

    if (uid) {
      await adminDb.collection("users").doc(uid).set(
        {
          plan: plan === "yearly" ? "yearly" : "monthly",
          isPremium: true,
          subscriptionStatus: "active",
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
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
    const plan = subscription.metadata?.plan;

    const isActive =
      subscription.status === "active" ||
      subscription.status === "trialing";

    if (uid) {
      await adminDb.collection("users").doc(uid).set(
        {
          plan: isActive ? plan : "free",
          isPremium: isActive,
          subscriptionStatus: subscription.status,
        },
        { merge: true }
      );
    }
  }

  return NextResponse.json({ received: true });
}
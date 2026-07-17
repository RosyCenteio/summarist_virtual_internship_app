import { NextResponse } from "next/server";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const { uid, email, plan } = await req.json();

    if (!uid || !email || !plan) {
      return NextResponse.json(
        { error: "Missing uid, email, or plan" },
        { status: 400 }
      );
    }

    if (plan !== "monthly" && plan !== "yearly") {
      return NextResponse.json(
        { error: "Invalid subscription plan" },
        { status: 400 }
      );
    }

    const priceId =
      plan === "yearly"
        ? process.env.STRIPE_YEARLY_PRICE_ID
        : process.env.STRIPE_MONTHLY_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: `Missing Stripe price ID for ${plan} plan` },
        { status: 500 }
      );
    }

    // Find or create the Stripe customer
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    let stripeCustomerId: string;

    if (existingCustomers.data.length > 0) {
      stripeCustomerId = existingCustomers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          firebaseUID: uid,
        },
      });

      stripeCustomerId = customer.id;
    }

    // Build subscription_data separately
    const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData =
      {
        metadata: {
          firebaseUID: uid,
          plan,
        },
      };

    // Only yearly gets the seven-day trial
    if (plan === "yearly") {
      subscriptionData.trial_period_days = 7;
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

      metadata: {
        firebaseUID: uid,
        plan,
      },

      subscription_data: subscriptionData,

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/choose-plan`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create checkout session";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
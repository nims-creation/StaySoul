# Stripe Webhook Integration Guide

To successfully integrate and test Stripe Webhooks on your local machine, follow these steps:

## 1. Setup Stripe CLI
Download and install the Stripe CLI from [here](https://stripe.com/docs/stripe-cli).

## 2. Login to Stripe
Run the following command in your terminal and follow the instructions:
```bash
stripe login
```

## 3. Forward Events to Local Server
Forward Stripe events to your local application. The endpoint is configured at `/api/v1/webhook/payment`.
```bash
stripe listen --forward-to http://localhost:8080/api/v1/webhook/payment
```

## 4. Get Your Webhook Secret
When you run the `listen` command, it will output a message like:
> Your webhook signing secret is **whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxx**

Copy this secret.

## 5. Configure the Backend
Add the secret to your `application.properties` or set it as an environment variable:
```properties
# src/main/resources/application.properties
stripe.webhook.secret=whsec_your_actual_secret_here
```

## 6. Test a Payment
1. Start your Spring Boot application.
2. Go to your frontend and complete a booking.
3. Once you pay on the Stripe checkout page, Stripe will send a `checkout.session.completed` event to your local server.
4. Check your server logs; you should see "Successfully confirmed the booking" message.

> [!TIP]
> You can also trigger a mock event for testing:
> ```bash
> stripe trigger checkout.session.completed
> ```

# Checkout security boundary

The browser cart is presentation state only. `POST /api/checkout/validate` accepts identifiers, contact/address fields, promo code, and shipping method, then resolves products, prices, variants, sizes, availability, promo eligibility, and shipping costs from server-owned modules. Submitted totals and prices are never accepted.

Before production order creation, add deployment-backed rate limiting, server-generated idempotency keys, authenticated or same-site CSRF protections as appropriate, a tax service, durable inventory reservation, and a payment provider session created exclusively with server-side secrets. Never log checkout PII or payment fields.
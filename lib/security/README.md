# Security boundary

Validate all untrusted input on the server with Zod. Session cookies must be `HttpOnly`, `Secure` in production, and use an appropriate `SameSite` policy. Authorization belongs in server-side operations, never UI visibility. Payment providers must tokenize card details so raw card numbers and CVVs never reach SOLVYN servers or logs.

The development CSP permits inline/eval scripts required by Next.js tooling. Revisit `script-src`, `connect-src`, and `img-src` before adding analytics, payments, a CDN, or production image hosts.

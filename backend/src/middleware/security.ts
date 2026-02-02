import helmet from 'helmet';
import type { RequestHandler } from 'express';

/** Helmet security middleware with sensible defaults */
export const securityHeaders: RequestHandler = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https://tile.openstreetmap.org', 'https://unpkg.com'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  // Prevent clickjacking
  frameguard: { action: 'deny' },
  // Hide X-Powered-By
  hidePoweredBy: true,
  // HSTS for HTTPS
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
  },
  // Prevent MIME type sniffing
  noSniff: true,
  // XSS filter
  xssFilter: true,
  // Referrer policy
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});

import rateLimit from "express-rate-limit";

// Configure the rate limiter for public endpoints
export const publicRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    error: "Too many requests",
    message: "You have exceeded the 100 requests in 15 minutes limit!",
  },
});

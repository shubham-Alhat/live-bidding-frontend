# Bidhub - Live Bidding Platform

[BidHub](https://bidhub.in) is a real-time auction platform where users can join live auctions and place bids.

Built to handle the core challenges of a live bidding system:

- Two token system (refresh and access tokens) - **Silent token refresh via axios interceptors (no login interruptions for users).**
- **Redis-backed live auction state** with WebSocket room management.
- **Atomic Lua scripts** for race-condition-proof bid validation.
- **BullMQ background workers** for async job processing.

> [!Note]  
> **Architecture & Engineering**  
> For deep-dive into system design, architecture decisions, and engineering challenges solved (WebSocket state recovery, bid race conditions, auth flow, Redis design) — see the [Backend Repository →](https://github.com/shubham-Alhat/live-bidding-backend)

## 🎥 Project Demo

[![BidHub Live Demo](https://res.cloudinary.com/diery17cm/image/upload/v1779847664/ChatGPT_Image_May_27_2026_07_35_48_AM_peyjg4.png)](https://www.youtube.com/watch?v=BnmAwRhulNU&list=LL&index=1)

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/BnmAwRhulNU?si=OIk7nHmezarAQDjc"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/BnmAwRhulNU?si=OIk7nHmezarAQDjc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 🛠️ Tech Stack

| Layer             | Technology                                                          |
| ----------------- | ------------------------------------------------------------------- |
| Frontend          | Next.js 15 (App Router), TypeScript, shadcn/ui                      |
| Auth              | Google OAuth 2.0, JWT (Access + Refresh tokens), Axios Interceptors |
| Realtime          | WebSockets (ws), Redis                                              |
| Atomic Operations | Redis Lua Scripts                                                   |
| Backend           | Node.js, Express, TypeScript, Prisma ORM                            |
| Queue             | BullMQ + Redis (background job processing)                          |
| Database          | PostgreSQL (Neon)                                                   |
| Deployment        | Vercel (frontend) · Render (backend) · Redis Cloud                  |

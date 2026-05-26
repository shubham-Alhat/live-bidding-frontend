# Bidhub - Live Bidding Platform

[BidHub](https://bidhub.in) is a real-time auction platform where users can join live auctions and place bids.

Built to handle the core challenges of a live bidding system:

- Two token system (refresh and access tokens) - **Silent token refresh via axios interceptors (no login interruptions for users).**
- **Redis-backed live auction state** with WebSocket room management.
- **Atomic Lua scripts** for race-condition-proof bid validation.
- **BullMQ background workers** for async job processing.

> [!Note]  
> 🏗️ **_Architecture & Engineering_**  
> For deep-dive into system design, architecture decisions, and engineering challenges solved (WebSocket state recovery, bid race conditions, auth flow, Redis design) — see the [Backend Repository →](https://github.com/your-username/bidhub-backend)

## 🎥 Project Demo

[![Watch Demo](https://res.cloudinary.com/diery17cm/video/upload/so_1/IMG_0691_knrgne.jpg)](https://res.cloudinary.com/diery17cm/video/upload/f_mp4/q_auto/IMG_0691_knrgne)

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

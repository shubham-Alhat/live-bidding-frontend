import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);

async function verify(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return {
      id: payload.id as string,
      username: payload.username as string,
      isGuest: payload.isGuest === true,
    };
  } catch {
    return null; // expired, tampered, malformed
  }
}

async function createGuest() {
  const id = crypto.randomUUID();
  const user = { id, username: `leven_${id.slice(0, 8)}`, isGuest: true };
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return { user, token };
}

function isPrefetch(request: NextRequest) {
  return (
    request.headers.has("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch"
  );
}

const BOT_UA =
  /facebookexternalhit|Facebot|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Discordbot|Applebot|Googlebot|bingbot/i;

function isBot(request: NextRequest) {
  return BOT_UA.test(request.headers.get("user-agent") ?? "");
}

export async function proxy(request: NextRequest) {
  console.log("proxy runs");
  const headers = new Headers(request.headers);
  headers.delete("x-auth-user");
  headers.delete("x-auth-token");

  const existing = request.cookies.get("accessToken")?.value;
  const verified = existing ? await verify(existing) : null;

  // it avoids creating guest during prefetch
  if (!verified && (isPrefetch(request) || isBot(request))) {
    return NextResponse.next({ request: { headers } });
  }

  let user,
    token,
    isNew = false;
  if (verified && existing) {
    user = verified;
    token = existing;
  } else {
    ({ user, token } = await createGuest());
    isNew = true;
  }

  headers.set("x-auth-user", encodeURIComponent(JSON.stringify(user)));
  headers.set("x-auth-token", token);

  const res = NextResponse.next({ request: { headers } });
  if (isNew) {
    res.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      domain: process.env.NEXT_ENV === "production" ? ".bidhub.in" : undefined,
      maxAge: 60 * 60,
    });
  }
  return res;
}

export const config = {
  matcher: ["/", "/show/:path*"],
};

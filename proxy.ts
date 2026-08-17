import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "vellumhaus_access";
const UNLOCK_PATH = "/__vellumhaus_unlock";
const INVITE_PREFIX = "/invite/";
const COOKIE_LIFETIME = 60 * 60 * 12;

function page(error = false) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>vellumhaus — coming soon</title>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      html, body { min-height: 100%; }
      body {
        min-height: 100svh;
        margin: 0;
        display: grid;
        grid-template-rows: auto 1fr auto;
        background: #fff;
        color: #111;
        font-family: Arial, Helvetica, sans-serif;
      }
      header, footer { padding: 24px 28px; }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dedede;
      }
      .brand {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.04em;
      }
      .status {
        margin: 0;
        font: 10px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      main {
        width: min(100%, 920px);
        margin: auto;
        padding: 80px 28px;
      }
      h1 {
        max-width: 760px;
        margin: 0 0 52px;
        font-size: clamp(64px, 13vw, 164px);
        font-weight: 700;
        line-height: 0.82;
        letter-spacing: -0.085em;
        text-transform: uppercase;
      }
      form {
        width: min(100%, 440px);
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid #111;
      }
      label {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      input, button {
        min-height: 52px;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: inherit;
        font: 13px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      input { width: 100%; padding: 0 12px 0 0; outline: 0; }
      input::placeholder { color: #777; opacity: 1; }
      button { padding: 0; cursor: pointer; font-weight: 700; }
      button:hover, button:focus-visible { text-decoration: underline; text-underline-offset: 5px; }
      .error {
        min-height: 18px;
        margin: 12px 0 0;
        color: #b42318;
        font: 11px/1.4 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      footer {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        border-top: 1px solid #dedede;
        font: 10px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      footer span:last-child { color: #777; }
      @media (max-width: 560px) {
        header, footer { padding: 20px; }
        main { padding: 64px 20px; }
        h1 { margin-bottom: 44px; }
        footer { flex-direction: column; }
      }
    </style>
  </head>
  <body>
    <header>
      <p class="brand">vellumhaus©</p>
      <p class="status">Site update in progress</p>
    </header>
    <main>
      <h1>Coming<br />soon.</h1>
      <form action="${UNLOCK_PATH}" method="post">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter password" autocomplete="current-password" required autofocus />
        <button type="submit">Enter ↗</button>
      </form>
      <p class="error" role="status">${error ? "Incorrect password. Please try again." : ""}</p>
    </main>
    <footer>
      <span>Copyright 2026 VELIUMIN SRL. All Rights Reserved.</span>
      <span>Bucharest / Romania</span>
    </footer>
  </body>
</html>`;
}

async function accessToken(password: string) {
  const bytes = new TextEncoder().encode(`vellumhaus:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function comingSoon(error = false) {
  return new NextResponse(page(error), {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function grantAccess(request: NextRequest, token: string) {
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    maxAge: COOKIE_LIFETIME,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

export async function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const password = process.env.SITE_PASSWORD;
  const inviteToken = process.env.ACCESS_LINK_TOKEN;
  const expectedToken = password ? await accessToken(password) : "";

  if (request.method === "GET" && request.nextUrl.pathname.startsWith(INVITE_PREFIX)) {
    const submittedToken = request.nextUrl.pathname.slice(INVITE_PREFIX.length);

    if (inviteToken && submittedToken === inviteToken && expectedToken) {
      return grantAccess(request, expectedToken);
    }

    return comingSoon();
  }

  if (request.nextUrl.pathname === UNLOCK_PATH && request.method === "POST") {
    const form = await request.formData();
    const submittedPassword = form.get("password");

    if (password && submittedPassword === password) {
      return grantAccess(request, expectedToken);
    }

    return NextResponse.redirect(new URL("/?error=1", request.url), 303);
  }

  if (expectedToken && request.cookies.get(ACCESS_COOKIE)?.value === expectedToken) {
    return NextResponse.next();
  }

  return comingSoon(request.nextUrl.searchParams.get("error") === "1");
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

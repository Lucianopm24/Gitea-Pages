/**
 * functions/_proxy.js
 * Cloudflare Pages Function — proxy para evitar CORS.
 * El HTML le pasa ?url= y opcionalmente ?token=
 * Este archivo NO necesita modificaciones.
 */

export async function onRequest(context) {
  const { request } = context;

  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url    = new URL(request.url);
  const target = url.searchParams.get("url");
  const token  = url.searchParams.get("token");

  if (!target) {
    return new Response("Missing ?url param", { status: 400 });
  }

  let targetUrl;
  try {
    targetUrl = new URL(target);
    if (!["http:", "https:"].includes(targetUrl.protocol)) throw new Error();
  } catch {
    return new Response("URL inválida", { status: 400 });
  }

  const headers = { "User-Agent": "pages-proxy/1.0" };
  if (token && token.toLowerCase() !== "no") {
    headers["Authorization"] = "token " + token;
  }

  let upstream;
  try {
    upstream = await fetch(targetUrl.toString(), { headers });
  } catch (e) {
    return new Response("No se pudo conectar a la instancia: " + e.message, { status: 502 });
  }

  const resHeaders = new Headers();
  resHeaders.set("Access-Control-Allow-Origin", "*");
  const ct = upstream.headers.get("content-type");
  if (ct) resHeaders.set("Content-Type", ct);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: resHeaders,
  });
}

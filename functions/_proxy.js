/**
 * functions/_proxy.js
 * Cloudflare Pages Function — actúa como proxy para evitar CORS.
 * El HTML le pasa la URL y opcionalmente el token.
 * Este archivo NO necesita modificaciones.
 */

export async function onRequest(context) {
  const { request } = context;

  // Solo GET
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(request.url);
  const target = url.searchParams.get("url");
  const token  = url.searchParams.get("token");

  if (!target) {
    return new Response("Missing ?url param", { status: 400 });
  }

  // Seguridad básica: solo permite URLs http/https
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

  // Pasar el body y el content-type tal cual, agregando headers CORS
  const responseHeaders = new Headers();
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  const ct = upstream.headers.get("content-type");
  if (ct) responseHeaders.set("Content-Type", ct);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

/**
 * Cloudflare Pages Function — newsletter subscription proxy
 *
 * Receives { email, locale } from the landing-page form, forwards to Mailjet
 * using server-side credentials. No cookies are set on the visitor.
 *
 * Required environment variables (configure in Cloudflare Pages → Settings):
 *   MAILJET_API_KEY     — Mailjet API key
 *   MAILJET_API_SECRET  — Mailjet API secret key
 *   MAILJET_LIST_ID     — Numeric contact-list ID
 *
 * Deploy: this file is auto-discovered by Cloudflare Pages from /functions/.
 * If the site is hosted elsewhere (GitHub Pages, Netlify), port this handler
 * to the equivalent serverless format and update the form's data-endpoint.
 */
export async function onRequestPost(context) {
   const { request, env } = context;

   let body;
   try {
      body = await request.json();
   } catch {
      return json({ ok: false, error: "invalid_body" }, 400);
   }

   const email = typeof body.email === "string" ? body.email.trim() : "";
   const locale = typeof body.locale === "string" ? body.locale : "en";

   if (!isValidEmail(email)) {
      return json({ ok: false, error: "invalid_email" }, 400);
   }

   const apiKey = env.MAILJET_API_KEY;
   const apiSecret = env.MAILJET_API_SECRET;
   const listID = env.MAILJET_LIST_ID;

   if (!apiKey || !apiSecret || !listID) {
      return json({ ok: false, error: "not_configured" }, 503);
   }

   const auth = btoa(`${apiKey}:${apiSecret}`);
   const mailjetURL = `https://api.mailjet.com/v3/REST/contactslist/${listID}/managecontact`;

   let mjResponse;
   try {
      mjResponse = await fetch(mailjetURL, {
         method: "POST",
         headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            Email: email,
            Action: "addnoforce",
            Properties: { locale },
         }),
      });
   } catch (err) {
      return json({ ok: false, error: "upstream_unreachable" }, 502);
   }

   if (!mjResponse.ok && mjResponse.status !== 201) {
      const text = await safeText(mjResponse);
      return json({ ok: false, error: "upstream_error", status: mjResponse.status, detail: text }, 502);
   }

   return json({ ok: true });
}

function isValidEmail(email) {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function json(payload, status = 200) {
   return new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
   });
}

async function safeText(response) {
   try {
      return (await response.text()).slice(0, 200);
   } catch {
      return "";
   }
}

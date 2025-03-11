import { Bot, webhookCallback } from "@grammy/core";
import { oldYaleToHangulHandler } from "./hangul/old-yale.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN")!);

oldYaleToHangulHandler(bot);

const handleUpdate = webhookCallback(bot, "cloudflare-mod");

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname === `/${bot.token}`) {
      try {
        return await handleUpdate(req);
      } catch (e) {
        console.error(e);
      }
      return new Response(null, { status: 200 });
    }
  }
  return new Response(null, { status: 404 });
});

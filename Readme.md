# Worker AI Bot

Limits: [Check Here](https://developers.cloudflare.com/workers-ai/platform/limits/)

An AI chat bot powered by the Cloudflare Worker AI and running on vercel.

> did any one know how to use some telegram bot api node packages on Cloudflare Pages? Need that!

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FArmoLab%2FWorkerAI_Vercel_Telegarm_Bot&env=TELEGRAM_TOKEN,CF_AccountID,CF_Auth,model,USER_ALLOWED,ADMIN)

## Environment Varibles

  1. `TELEGRAM_TOKEN` (Required): Your Telegram Bot Access Token.

  2. `CF_AccountID` (Required): Your Cloudflare Account ID,
     used to access the Cloudflare Worker AI's RESTful API. Check Cloudflare's Docs to get to know how to get it.

  3. `CF_Auth` (Required): Your Cloudflare Auth Token, Permissions is Worker AI.
     used to access the Cloudflare Worker AI's RESTful API. Check Cloudflare's Docs to get to know how to get it.

  4. `model` (Optional): Worker AI Model, by default it is "@cf/meta/llama-2-7b-chat-int8"

  5. `USER_ALLOWED` (Optional, but set it is better): Telegram User ID who can access to this bot. if it is unset that means ANYONE can get access to this bot.  Split it by `,`.

  6. `ADMIN` (Optional): Telegram User ID who can manage(?) this bot, like access some senstive data via this bot directly. Split it by `,`.
  

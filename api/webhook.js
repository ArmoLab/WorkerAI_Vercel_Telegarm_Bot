import TelegramBot from "node-telegram-bot-api";
import Commands from "./internal/Commands/main.mjs"
const config = {
    AllowList: process.env.USER_ALLOWED ? process.env.USER_ALLOWED.split(",") : false,
    Admins: (process.env.ADMIN || "").split(","),
    model: process.env.model || "@cf/meta/llama-2-7b-chat-int8"
};
console.log(new Commands(config))
export default async (request, response) => {
    try {
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
        // const username = process.env.TELEGRAM_BOT_USERNAME || `@${(await bot.getMe()).username}`;
        const { chat: { id }, text } = request.body.message;

        if (id.toString().startsWith("-")) {
            await bot.sendMessage(id, `Only accept DM.`, { parse_mode: "Markdown" })
        }

        if (text.startsWith("/")) {
            // handle commands here
            let Command = text.split(" ")[0].split("/")[1].split("@")[0];
            let Text = text.split(text.split(" ")[0])[1];
            if (!Commands[Command]) {
                await bot.sendMessage(id, "The command that you requested is not exist.", { parse_mode: "Markdown" })
            }
            await Commands[Command](Text, id, bot);
        }
        
        // await bot.sendMessage(id, `hello, ${ id }, im  \`${username}\``, { parse_mode: "Markdown" })
    } catch (error) {
        console.error(`Error to sending message, ${error.toString()}`);
    }
    response.send("OK");
};
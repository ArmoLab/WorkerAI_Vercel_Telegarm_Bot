import TelegramBot from "./internal/Telegram/main.js";
import CommandClass from "./internal/Commands/main.js";
const config = {
    AllowList: process.env.USER_ALLOWED ? process.env.USER_ALLOWED.split(",") : false,
    Admins: (process.env.ADMIN || "").split(","),
    model: process.env.model || "@cf/meta/llama-2-7b-chat-int8",
    model_img: process.env.model_img || "@cf/stabilityai/stable-diffusion-xl-base-1.0"
};
export default async (request, response) => {
    try {
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
        const Commands = new CommandClass(config, bot);
        // const username = process.env.TELEGRAM_BOT_USERNAME || `@${(await bot.getMe()).username}`;
        const { chat: { id }, text } = request.body.message;

        console.log(`Msg: \`${text}\` from <${id}>`)

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
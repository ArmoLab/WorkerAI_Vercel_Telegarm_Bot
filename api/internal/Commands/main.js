export default class CommandClass {
    constructor (config, bot) {
        this.bot = bot;
        for (let i in config) {
            this[i] = config[i];
        }

        // run check here 
        // console.log(`Initlized with the config below:\n${JSON.stringify(config)}`);
        // for (let i in this) {
        //     if (typeof this[i] !== "function") {
        //         console.log(`${i}: ${this[i]}`)
        //     }
        // }

        return true;
    }
    async start (Text, id, bot) {
        await bot.sendMessage(id, `Hello, this is an AI chat bot powered by Cloudflare AI.`, { parse_mode: "Markdown" })
        if (this.AllowList === false || this.AllowList.includes(id.toString())) {
            await bot.sendMessage(id, `Great, ${ id } is in the allow list(or the AllowList is disabled).`, { parse_mode: "Markdown" })
        } else {
            await bot.sendMessage(id, `OH, sorry, you're not in the allow list.`, { parse_mode: "Markdown" })
        }
    }
    async help (Text, id, bot) {
        await bot.sendMessage(
            id, 
            `Use /ask <Prompt> to ask to AI (${this.model})\n` +
            `Use /listConfig to check config (Admin only)`,
            { parse_mode: "Markdown" }
        )
    }
    async listConfig (Text, id, bot) {
        if (!this.Admins.includes(id.toString())) {
            await bot.sendMessage(id, `OH, sorry, but you're not an ADMIN.`, { parse_mode: "Markdown" })
            return;
        }
        let ResponseText = `Current config: \n\n`;
        for (let i in this) {
            if (typeof this[i] !== "function") {
                ResponseText += `${i}: ${this[i]}\n`
            }
        }
        await bot.sendMessage(
            id, 
            ResponseText, 
            { parse_mode: "Markdown" }
        )
    }
    async ask (Text = "", id, bot) {
        if (typeof this.AllowList === "object" && !this.AllowList.includes(id.toString())) {
            await bot.sendMessage(id, `OH, sorry, you're not in the allow list.`, { parse_mode: "Markdown" })
            return;
        }
        let AIResponse = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_AccountID}/ai/run/${this.model}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.CF_Auth}`
                },
                body: JSON.stringify({
                    "prompt": Text
                })
            }
        ).then(res => res.json())
        await bot.sendMessage(id, AIResponse.result.response, { parse_mode: "Markdown" })
    }
    async img (Prompt = null, id, bot) {
        if (typeof this.AllowList === "object" && !this.AllowList.includes(id.toString())) {
            await bot.sendMessage(id, `OH, sorry, you're not in the allow list.`, { parse_mode: "Markdown" })
            return;
        }
        await bot.sendMessage(id, `We'll try that.`, { parse_mode: "Markdown" })


        let AIResponse = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_AccountID}/ai/run/${this.model_img}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.CF_Auth}`
                },
                body: JSON.stringify({
                    "prompt": Prompt
                })
            }
        ).then(res => res.blob())

        const form = new FormData()
		form.append("photo", AIResponse)

        let img_url = await fetch("https://telegra.ph/upload", {
            method: "POST",
            body: form,
        })
        .then(res => res.json())
        .then(res => {
            return `https://telegra.ph${res[0].src}`;
        })
        .catch (() => {
            return false;
        });
        
        if (img_url !== false) {
            await bot.sendDocument(id, img_url, {
                caption: 
                    `Image created with prompt: \`${Prompt}\`.\n` +
                    `Share it using ${img_url}`,
                parse_mode: "Markdown"
            })
        }
    }
}

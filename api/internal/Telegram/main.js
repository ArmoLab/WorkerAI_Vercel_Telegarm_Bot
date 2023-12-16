export default class TelegramBot {
    constructor(Token = null) {
        if (Token === null) {
            throw "Token cannot be empty!"
        }
        this.token = Token;
        return true;
    }
    sendMessage (chat_id, text, Options = {}) {
        return fetch(
            `https://api.telegram.org/bot${this.token}/sendMessage`,
            {
                method: "POST",
                body: JSON.stringify(Object.assign({
                    chat_id,
                    text
                }, Options)),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then( response => response.json() )
    }
    /**
     * 
     * @param {any} chat_id 
     * @param {Blob} data 
     * @param {Object} Options 
     * @returns 
     */
    async sendDocument (chat_id, file_url, Options = {}) {
        return fetch(
            `https://api.telegram.org/bot${this.token}/sendDocument`,
            {
                method: "POST",
                body:  JSON.stringify(Object.assign({
                    chat_id,
                    document: file_url
                }, Options)),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then( response => response.json() )
    }
}
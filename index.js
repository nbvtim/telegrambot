let c = console.log
const token = '5465151197:AAEo00Fhed2kh8jn_4T_0OYyvCoukbiwjkM'
// npm i node-telegram-bot-api
// npm i nodemon
const TelegramApi = require('node-telegram-bot-api')

const bot = new TelegramApi(token, {polling: true})

const start = ()=>{
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Информация'},
        {command: '/game', description: 'Игра'}   
    ])
    
    bot.on('message', async msg=>{
        const text = msg.text
        const chatId = msg.chat.id
        //bot.sendMessage(chatId, `Ты написал мне: \n${text}`)
        
        if(text === "/start"){
           await bot.sendSticker(chatId,"1.jfif")
           return bot.sendMessage(chatId, "Добро пожаловать в Телеграмм бот")
        }

        if(text === "/info"){
           return bot.sendMessage(chatId,    `
${msg.message_id} 
${msg.chat.id} 
${msg.chat.first_name} 
${msg.chat.username} 
${msg.date}
                                            `)}
        if(text === "/game"){
            return bot.sendMessage(chatId, "Игра")
        }
        return bot.sendMessage(chatId, "ERROR")
    })
    
}
start()
// npm run dev

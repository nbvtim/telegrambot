let c = console.log
const TOKEN = '5465151197:AAEo00Fhed2kh8jn_4T_0OYyvCoukbiwjkM'

const TelegramApi = require('node-telegram-bot-api')

const bot = new TelegramApi(TOKEN, {polling: true})

let chats = {}
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "1", callback_data: "1"},{text: "2", callback_data: "2"},{text: "3", callback_data: "3"}],
            [{text: "4", callback_data: "4"},{text: "5", callback_data: "5"},{text: "6", callback_data: "6"}],
            [{text: "7", callback_data: "7"},{text: "8", callback_data: "8"},{text: "9", callback_data: "9"}],
            [{text: "0", callback_data: "0"}]
           
        ]
    })
}
const againOptions = {
    reply_markup: JSON.stringify({ 
        inline_keyboard: [
            [{text: "Играть еще раз", callback_data: "/again"}]
        ]
    })
}

const startGame = async (chatId)=>{
    await bot.sendMessage(chatId, "Сейчас я загадаю число от 0 до 9...")
    const randomnumber = Math.floor(Math.random() *10)
    chats[chatId] = randomnumber
    await bot.sendMessage(chatId, `Отгадайте число`, gameOptions)
}

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
           await bot.sendSticker(chatId,"telegaworldbot.jfif")
           return bot.sendMessage(chatId, "Добро пожаловать в Телеграмм бот")
        }

        if(text === "/info"){
            return bot.sendMessage(chatId, 'chatId: '+chatId)
        }
        if(text === "/game"){
           return startGame(chatId)
        }

        return bot.sendMessage(chatId, "__err")
    })

    bot.on("callback_query", async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === "/again"){
            return startGame(chatId)
        }
        if( data == chats[chatId]){
            return await bot.sendMessage(chatId, `!!! ВЕРНО !!! ${data}`, againOptions) 
        }else{
            return await bot.sendMessage(chatId, `неверное число ${data}`)
        }
    })
}
start()
// npm run dev

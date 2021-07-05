const {Telegraf, Markup} = require('telegraf')
const fs = require("fs")

const config = require('./config')
const keyboards = require('./keyboards')
const bot = new Telegraf(config.TOKEN)


bot.command('start', (ctx) => {
    const user_id = ctx.message.chat.id;
    if (config.admins_id.includes(user_id)) {
        ctx.telegram.sendMessage(ctx.message.chat.id, "Online")
    }
    else {
        console.log(user_id)
    }

})


bot.on('text', (ctx) => {
    // Explicit usage
    ctx.telegram.sendMessage(ctx.message.chat.id, 'Вопросы')
    // Using context shortcut
    ctx.reply(`Hello ${ctx.state.role}`)
})


bot.on('callback_query', (ctx) => {
    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    // Using context shortcut
    ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
    const result = []
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

    // Using context shortcut
    ctx.answerInlineQuery(result)
})

bot.launch()
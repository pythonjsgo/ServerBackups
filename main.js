const {Telegraf, Markup} = require('telegraf')
const cron = require('node-cron')


const config = require('./config')
const keyboards = require('./keyboards')
const tools = require("./tools");

const bot = new Telegraf(config.TOKEN)

tools.CreateBackup()
tools.NotifyAdmins("Started!")

bot.start((ctx) => {
    const user_id = ctx.message.chat.id;
    if (config.admins_id.includes(user_id)) {
        ctx.reply("Online");
    } else {
        tools.UnauthorizedMessage(ctx)
    }
})

bot.on('text', (ctx) => {
    const user_id = ctx.message.chat.id
    if (config.admins_id.includes(user_id)) {
        ctx.reply("Online");
    } else {
        tools.UnauthorizedMessage(ctx)
    }
})
cron.schedule('0 */4 * * *', () => {
    // send the message her
    tools.CreateBackup()
});


bot.launch()
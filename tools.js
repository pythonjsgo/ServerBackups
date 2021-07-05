const {Telegraf, Markup} = require('telegraf')
const fs = require("fs")
const archiver = require('archiver');

const config = require("./config");
const bot = new Telegraf(config.TOKEN)

function NotifyAdmins(message_text) {
    for (const _user_id of config.admins_id) {
        bot.telegram.sendMessage(_user_id, message_text).then()
    }
}


module.exports = {
    NotifyAdmins: NotifyAdmins,
    UnauthorizedMessage: function UnauthorizedMessage(ctx) {
        for (const _user_id of config.admins_id) {
            ctx.telegram.sendMessage(_user_id,
                "Unauthorized message \nfrom user_id: " +
                ctx.message.chat.id.toString() + "\ntext: " +
                ctx.message.text).then()
        }
    },
    CreateBackup: function CreateBackup() {
        const output = fs.createWriteStream('backup.zip');
        const archive = archiver('zip');

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;


        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes')
            console.log('archiver has been finalized and the output file descriptor has closed.')

        });
        archive.on('error', function (err) {
            NotifyAdmins("error: " + err)
        });
        archive.pipe(output);
        archive.directory(config.backup_folder_path, "backup")
        archive.finalize().then(function () {
                for (const _user_id of config.admins_id) {
                    bot.telegram.sendDocument(_user_id, {
                        source: "backup.zip",
                        filename: "backup.zip",
                    }).then(
                        bot.telegram.sendMessage(_user_id, "#backup " + dateTime)
                    )
                }
            }
        )


    }
}
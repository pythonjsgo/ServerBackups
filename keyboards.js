const {Telegraf, Markup} = require('telegraf')

module.exports.main_menu_keyboard = Markup.keyboard([
    ["Общие", "Pride-Relax"],
    ["Gym", "Услуги"],
    ["Направления", "Тренеры"],
    ["Акции"]])

module.exports.qa_menu_keyboard_services = Markup.keyboard([
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["Назад"]
])
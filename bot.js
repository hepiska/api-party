var express = require('express');
var router = express.Router();
const telegram = require('node-telegram-bot-api');
var token = process.env.TOKEN;
const belitunginfo =('377554539:AAH0C3x8hOBdZncjErsA7jJ9gYknpCe7oxM');
var helper = require('./helper')
var weather = require('npm-openweathermap');
weather.api_key='f9acfc98958f0ae6da90cd1aa1f78f19';
//var bodyParser = require('body-parser');
var bot;
if(process.env.NODE_ENV === 'production') {
  bot = new telegram(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new telegram(belitunginfo, { polling: true });
}

//console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
bot.onText(/\/start/, function(message) {
bot.sendMessage(message.chat.id,`halo ${message.from.first_name} ${message.from.last_name} selamat datang belitung info bot:
ketik
/cuaca : untuk melihat kondisi cuaca hari ini,
`);
});

bot.onText(/\/cuaca/, function(message) {
bot.sendMessage(message.chat.id,`halo mau liat cuaca dmn:
/manggar,
/tanjung_pandan`);

});


bot.onText(/\/tanjung_pandan/, function(message) {

console.log('masuk');
  weather.get_weather_custom('city','tanjungpandan' , 'forecast').then(function(weathers){
    let todays=helper.getToday(weathers);
    bot.sendMessage(message.chat.id,`today weather`)
    todays.forEach(function(today){
      console.log(today);
      bot.sendMessage(message.chat.id,`${today.dt_txt} :
${today.weather[0].description} ,
temperatur : ${today.main.temp},
wind speed : ${today.wind.speed}`)
    })

  },function(error){
      console.log(error)
  })

});

bot.onText(/\/manggar/, function(message) {

console.log('masuk');
  weather.get_weather_custom('city','manggar' , 'forecast').then(function(weathers){
    let todays=helper.getToday(weathers);
    bot.sendMessage(message.chat.id,`today weather`)
    todays.forEach(function(today){
      console.log(today);
      bot.sendMessage(message.chat.id,`${today.dt_txt} :
${today.weather[0].description} ,
temperatur : ${today.main.temp},
wind speed : ${today.wind.speed}`)
    })

  },function(error){
      console.log(error)
  })

});


module.exports=router

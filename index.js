// npm install node-fetch
// npm init -y
// Other thingys 

const { config } =  require('./config.js')
const player_url = "https://www.rolimons.com/player/"+config.UserID
const fetch=require("node-fetch")  
const express = require('express')
const app = express()
const port = 3000
var loops = 0
var opened_req = false
var player_name = ""
var r_values
var p_inv

// getting player name
fetch("https://users.roblox.com/v1/users/"+config.UserID)
  .then(res => res.json())
  .then(json => player_name=json.name + " (" + json.displayName + ")")

// why don't u have docs on the table??
var update_values = async function(){
  await fetch("https://www.rolimons.com/itemapi/itemdetails")
  .then(res => res.json())
  .then(json => r_values=json)
};

// thank you for not having me look through all the item catagorys 
var get_inv = async function(){
  await fetch("https://inventory.roblox.com/v1/users/"+config.UserID+"/assets/collectibles?sortOrder=Asc&limit=100")
  .then(res => res.json())
  .then(json => p_inv=json.data)
};

// webhook tings
var send_wr = async function(success, items){
  loops = loops+1
  var items_n = ""
  var fixtags = ""
  var fixreq = ""
  var total_offerv = 0
  var total_request = 0
  
  console.log(items)
  for (let i=0; i < items.length; i++) {
    total_offerv=total_offerv+r_values.items[items[i]][4]
    items_n = items_n + `
    ` + r_values.items[items[i]][0]
  };
  for (let i=0; i < config.RoliAd.r_tags.length; i++) {
    fixtags = fixtags + " :" + config.RoliAd.r_tags[i] + ":"
  };
  for (let i=0; i < config.RoliAd.r_items.length; i++) {
    total_request=total_request+r_values.items[config.RoliAd.r_items[i]][4]
    fixreq = fixreq + `
    ` + r_values.items[config.RoliAd.r_items[i]][0]
  };
  var params = {
      username: "Island Ads",
      avatar_url: "https://cdn.discordapp.com/attachments/616460506231865357/927233792710684742/unknown.png",
      embeds: [
          {
        "type": "rich",
        "title": player_name,
        "description": `***A_Status: `+ success + `***`,
        "color": config.Webhook.webhook_color,
        "fields": [
          {
            "name": player_name + `'s Roli-Ad:`,
            "value": "***Offering:***" + items_n + ` 
            (V: `+ total_offerv +`)
            ***Asking:*** ` + fixreq + ` 
            (V: `+ total_request + `) 
            ***Tags:***
            ` + fixtags
          },
          {
            "name": `CAPR:`,
            "value": loops.toString()
          }
        ],
        "thumbnail": {
          "url": `https://www.roblox.com/headshot-thumbnail/image?userId=`+config.UserID+`&width=420&height=420&format=png`,
          "height": 0,
          "width": 0
        },
        "author": {
          "name": `Island Ads`,
          "icon_url": `https://media.discordapp.net/attachments/616460506231865357/827917363969654784/Island_Logo_2.png`
        },
        "footer": {
          "icon_url": `https://media.discordapp.net/attachments/616460506231865357/827917363969654784/Island_Logo_2.png`,
          "text": `By Basic#2142 | Version 1.00`
        },
        "url": `https://www.rolimons.com/player/`+config.UserID
      }
      ]
  }
  fetch(config.Webhook.webhook_url, {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(params)
  })
};

//ykiyk
var post_ad = async function(){
  if (config.RoliAd.posttop==true){
    var t4 = new Array();
    var fake_t4 = new Array();
    await get_inv()
    await update_values()
    p_inv.forEach(item => {
      var i_val = r_values.items[item.assetId][4];
      console.log(i_val + " | AID:" + item.assetId);
      t4["id"+i_val.toString()]=item.assetId;
      fake_t4.push(i_val)
    });
    fake_t4.sort((a,b)=>b-a)
    var c_t4 = new Array();
    for (let i=0; i < 4; i++) {
      c_t4.push(t4["id"+fake_t4[i]])
    };
    fetch('https://www.rolimons.com/tradeapi/create',{
      method:"POST",
      headers: { 'Content-Type': 'application/json',"cookie": config.Roli_cookie},
      body: JSON.stringify({"player_id":config.UserID,"offer_item_ids":c_t4,"request_item_ids":config.RoliAd.r_items,"request_tags":config.RoliAd.r_tags}) 
    }).then(resolve=>resolve.json()).then(idata=>{
      send_wr(idata.success, c_t4)
    })
  }else{
    fetch('https://www.rolimons.com/tradeapi/create',{
      method:"POST",
      headers: { 'Content-Type': 'application/json',"cookie": config.Roli_cookie},
      body: JSON.stringify({"player_id":config.UserID,"offer_item_ids":config.RoliAd.item_ids,"request_item_ids":config.RoliAd.r_items,"request_tags":config.RoliAd.r_tags}) 
    }).then(resolve=>resolve.json()).then(idata=>{
      send_wr(idata.success, config.RoliAd.item_ids)
    })
  };
};

// material gorl loop
post_ad()
setInterval(() => {
  post_ad()
}, Math.floor(Math.random() * (config.RoliAd.rwait_max - config.RoliAd.rwait_min + 1) + config.RoliAd.rwait_min));

// For repl to receive HTTP traffic
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
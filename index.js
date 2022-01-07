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
var outbounds

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
var send_wr = async function(success, o_items, r_items, r_tags){
  loops = loops+1
  var items_n = ""
  var fixtags = ""
  var fixreq = ""
  var total_offerv = 0
  var total_request = 0
  var success_emoji

  if (success.toString()=="true"){
    success_emoji="🟩"
  }else if (success.toString()=="false"){
    success_emoji="🟥"
  }

  for (let i=0; i < o_items.length; i++) {
    total_offerv=total_offerv+r_values.items[o_items[i]][4]
    items_n = items_n + `\n` + r_values.items[o_items[i]][0]
  };
  for (let i=0; i < r_tags.length; i++) {
    fixtags = fixtags + " :" + r_tags[i] + ":"
  };
  for (let i=0; i < r_items.length; i++) {
    total_request=total_request+r_values.items[r_items[i]][4]
    fixreq = fixreq + `\n` + r_values.items[r_items[i]][0]
  };
  var params = {
      username: "Island Ads",
      avatar_url: "https://cdn.discordapp.com/attachments/616460506231865357/927233792710684742/unknown.png",
      embeds: [
          {
        "type": "rich",
        "title": player_name+" 👥",
        "description": `***A_Status: `+ success + `***  `+success_emoji,
        "color": config.Webhook.webhook_color,
        "fields": [
          {
            "name": "***"+player_name + `'s Roli-Ad  📊:***\n`,
            "value": "***Offering  📡:***" + items_n + `\n(V: `+ total_offerv +`)\n***Asking  📲:*** ` + fixreq + `\n(V: `+ total_request + `) \n***Tags:***\n` + fixtags
          },
          {
            "name": `CAPR  🔁:`,
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
          "text": `By Basic#2142 | Version 1.01`
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

// A more neat way of making arguments for the request
var get_args = async function(){
  if (config.RoliAd.restate==true){
    await update_values();
    await get_inv()
    var f_inv = new Array();
    var outbounds;
    var ci_list = {"offer":[], "request": []};

    // Formats player's inv
    p_inv.forEach(item => {
      f_inv["id"+item.assetId]="true";
    })

    // Gets last 10 outbounds 
    await fetch('https://trades.roblox.com/v1/trades/outbound?cursor=&limit=10&sortOrder=Desc', {
      method: "GET",
      headers: {'Content-Type': 'application/json',"cookie": ".ROBLOSECURITY="+config.rbx_cookie}
    })
    .then(res => res.json())
    .then(json => outbounds=json.data);

    // Gets last invalid outbound
    for (let i=0; i < outbounds.length; i++) {
      console.log(outbounds)
      var trade = outbounds[i]
      var viewed_t
      var viewed_i = new Array();
      console.log("Searching trade with: "+trade.user.name)
      await fetch('https://trades.roblox.com/v1/trades/'+trade.id, {
        method: "GET",
        headers: {'Content-Type': 'application/json',"cookie": ".ROBLOSECURITY="+config.rbx_cookie}
      })
      .then(res => res.json())
      .then(json => viewed_t=json.offers);
      // Checks if item is still in the player's inv
      for (let i=0; i < viewed_t[0].userAssets.length; i++) {
        console.log("Checking: "+viewed_t[0].userAssets[i].assetId)
        if (f_inv["id"+viewed_t[0].userAssets[i].assetId]=="true"){
          viewed_i.push(viewed_t[0].userAssets[i].assetId)
        };
      };
      if (viewed_i.length==viewed_t[0].userAssets.length){
        ci_list.offer=viewed_i;
        for (let i=0; i < viewed_t[1].userAssets.length; i++) {
          ci_list.request[i]=viewed_t[1].userAssets[i].assetId
        };
        console.log(ci_list);
        break;
      };
    }

    // Checks if any valid trades were found, if not subs them for reg settings
    if (ci_list.offer.length<1){
      return {"o_items":config.RoliAd.item_ids, "r_items":config.RoliAd.r_items, "r_tags":config.RoliAd.r_tags};
    }else{
      return {"o_items":ci_list.offer, "r_items":ci_list.request, "r_tags":[]}
    }
  }else if (config.RoliAd.posttop==true){  
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
    for (let i=0; i < fake_t4.length; i++) {
      c_t4.push(t4["id"+fake_t4[i]])
    };
    return {"o_items":c_t4, "r_items":config.RoliAd.r_items, "r_tags":config.RoliAd.r_tags};
  }else{
    await update_values()
    return {"o_items":config.RoliAd.item_ids, "r_items":config.RoliAd.r_items, "r_tags":config.RoliAd.r_tags};
  };
};

//ykiyk
var post_ad = async function(){
  var api_args = await get_args()
  fetch('https://www.rolimons.com/tradeapi/create',{
    method:"POST",
    headers: { 'Content-Type': 'application/json',"cookie": config.Roli_cookie},
    body: JSON.stringify({"player_id":config.UserID,"offer_item_ids":api_args.o_items,"request_item_ids":api_args.r_items,"request_tags":api_args.r_tags}) 
  }).then(resolve=>resolve.json()).then(idata=>{
    send_wr(idata.success, api_args.o_items, api_args.r_items, api_args.r_tags)
  })
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

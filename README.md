# Island-Ads
Island-Ads is an open-source bot that will make ads (customizable by config.js) on rolimons.com. Island Ads was made for fun and personal use in Node.js. The bot doesn't require you to install or run it on your pc 24/7 as it can be easily forked onto repl. The bot allows you to somewhat consistently advertise your offer which increases the chance you get a good inbound trade or the offer you requested as more people will have the chance to view your offer.

# Installation
```
A => Create a repl account and fork the repository
1. Create a repl.it account
2. Go to home (https://replit.com/~)
3. Press the plus button under the Create section
4. Click import from github and paste this link in "https://github.com/BasicVariable/Island-Ads.git"
5. Click import from github and wait for the repl to load everything in
6. Select the Node.js language and click Done

B => input your Rolimons cookie and discord webhook
1. Click the secrets button on the left bar (has a lock icon)
2. Put the word "cookie" in the key text box and open a new tab with this link "https://www.rolimons.com/tradeadcreate"
3. Login to Rolimons (if you aren't already) and inspect the web page
4. Go to the network tab and refresh the page 
5. Click the first request called "tradeadcreate" and scroll down to the request headers section
6. Find/copy the cookie and paste it in the value textbox (on the repl page) then press the Add new secret button
7. After that type "webhook_url" in the key textbox
8. Make a new discord server and go to server settings 
9. Go to the integrations section and click the webhooks tab
10. Create a new webhook, copy the url, and paste the url in the value textbox (on the repl page)
11. Press the Add new secret button

C => Edit the config
1. Click the files button (icon of a page with a bent corner)
2. Click the config.js file 
3. Edit values of the config according to the documentaion provided below (Don't change the Roli_cookie and webhook_url values)
- My config WILL NOT work for you, be sure to edit it with items you have and your own userid

D => Start the bot and use uptimerobot to keep it running
1. On the top of the page press the Run button 
2. When a white window appears on the top-right copy the url thats on top of it
3. Create a new account with uptimerobot (https://uptimerobot.com/) and go to the dashboard 
4. Press the Add new moniter button and select the HTTP(s) monitor type
5. Put in your URL in the url textbox, set the monitoring interval to 5 minutes, set the monitor timeout to 10 seconds, and choose any name
6. Click create monitor

E => Acknowledge the following
~ You may need to edit the config in the future to output the best Ads
~ You need to pause the moniter before stopping the repl to stop the bot
~ I am not liable for repercussions to your Rolimons account for using the bot
~ Notifications will be sent to the channel you choose when making the webhook (you can still change it though in its settings)
```

# Config Documentaion
```
# Roli_cookie;	Your Rolimons cookie in a string EX: _RoliVerification=_RoliData=

# UserID; Your Roblox user id

# item_ids; the items you want to offer in the Ad (added with the perfered item's assetid)

# r_items; the items you want to request in the Ad (added with the perfered item's assetid)

# r_tags; the rolimons tags used on the requesting side of the Ad (added as a string and all lowercase letters)

# rwait_min; the minimum amount of time the bot will wait to attempt to create another add (recommended to stay at above 18minutes/1080000 milliseconds)

# rwait_max; the maximum amount of time the bot will wait to attempt to create another add (recommended to stay at above 22minutes/1320000 milliseconds)

# posttop; enabling this (by setting it from false to true) will force the bot to add your top 4 items (sorted by rolimons value) to the offer side of the trade Ad

# webhook_url; the discord webhook url the bot will use to notify you of attempted Ads

# webhook_color; the (hexcode) color of the embedded webhook url

# CAPR; Not in the config but, on the webhook so I'd like to explain it. CAPR = Completed ads per run, it shows the amount of times the bot requested to post an add, this can be reset when the repl stops or pauses due to inactivity so don't expect it to go that high.
```
# Author
* [**Basic#2142**](https://www.roblox.com/users/643454786/profile) - Owner/Developer

# How to help
Want to keep the project going? DM Basic#2142 on discord with bug reports, improvements to code, suggestions, or just words of encourgement. 

Wanna do even more? Donate to one of my crypto wallets listed below!
```
BTC: Bc1qwuq8fv68smr6n93gjehmvhtw92nyehx40pc0va
ETH: 0x4c029c4D0E2d58d56baF3A2E1d92661a12255136
BCH: qp60ntrzvctw8wm6lvkfjhxqdnzvm94ursyxk4m0ek
LTC: LRzJCr2m2ucLhPsQ1SwcQgyhLrGVgvHi68
SOL: 8WK6BuDYYW81zEHX4DysGyTeK3pCiFk2hZi1TgDkiMAk
DOGE: DStWQ56Y5vambPobvt8vPnUmwnNFfuwYBJ
SHIB: 0x4c029c4D0E2d58d56baF3A2E1d92661a12255136
RVN: RGk9HYQ4phNGvReaK2rkPRJyu9pkgAdyAD
NANO: nano_151s985n8guexwh5seg1n46ftk5oom6axdikuw1ad5hafe1h958rhbckyhki
```


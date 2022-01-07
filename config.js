// Documentation was moved to our Github repository, please read all documentaion on the config before editing things
const config={
  Roli_cookie: process.env.cookie, 
  rbx_cookie: process.env.r_cookie,
  UserID: 643454786, 
  RoliAd: {
    item_ids: [19027209], 
    r_items: [16986649, 71484026], 
    r_tags: ["rap", "downgrade"], 
    rwait_min: 1080000, 
    rwait_max: 1320000, 
    posttop: false, 
    restate: true 
  },
  Webhook: {
    webhook_url: process.env.webhook_url, 
    webhook_color: 0x00b3ff 
  },
};
module.exports = { config };
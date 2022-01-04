const config={
  Roli_cookie: process.env.cookie, // add in secrets tab
  UserID: 643454786, // Your roblox id
  RoliAd: {
    item_ids: [19027209], // offered items (use itemids)
    r_items: [188668491, 151789690], // requested items (use itemids)
    r_tags: ["rap", "downgrade"], // Rolimons tags ALWAYS lowercase <3
    rwait_min: 1080000, // recomended to stay at 18 minutes/1080000 milliseconds'
    rwait_max: 1320000, // recomended to stay at 22 minutes/1320000 milliseconds
    posttop: true // Offers your top (valued) items (up to 4) when making ads
  },
  Webhook: {
    webhook_url: process.env.webhook_url, // add in secrets tab
    webhook_color: 0x00b3ff // WebHook color in hex code
  },
};
module.exports = { config };
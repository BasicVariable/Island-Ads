require('dotenv').config();
general={
    rwait_min: 1080000, 
    rwait_max: 1320000,
    archive_tm: false,
    display_on: true
}
users=[
    {
        Roli_cookie: process.env.rl_cookie_1,
        rbx_cookie: process.env.r_cookie_1,
        UserID: 643454786,
        RoliAd: {
            item_ids: [19027209], 
            r_items: [16986649, 71484026], 
            r_tags: ["rap", "downgrade"], 
            posttop: false, 
            restate: true 
        },
        Webhook: {
            webhook_url: process.env.webhook_1, 
            webhook_color: 0x00b3ff
        }
    }
]

/* Duplicate above with different user data to use the bot on multiple users
EX:
users=[
    {
        Settings for first user
    }
    {
        Settings for next user
    }
]
*/
module.exports = {users, general};
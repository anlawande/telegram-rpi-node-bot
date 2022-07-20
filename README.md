# telegram-rpi-node-bot
A dockerized nodejs telegram bot that can be deployed on a raspberry pi and can facilitate communications with telegram users/groups

Add to the `.dockerignore` file for things you don't want to include in the built docker image

Airgram Docs
https://airgram.netlify.app/guides/getting-started

Telegram bots
https://core.telegram.org/bots

Telegram API
https://core.telegram.org/api/obtaining_api_id

TD Lib API
https://core.telegram.org/tdlib/getting-started

## Limitations
#### Only one bot per app
Due to the way the airgram works the auth, only one bot application can work per process.
But this can easily be worked around by starting as many processes for as many bots needed

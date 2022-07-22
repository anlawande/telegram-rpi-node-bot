# telegram-rpi-node-bot
A dockerized nodejs telegram bot that can be deployed on a raspberry pi and can facilitate communications with telegram users/groups

- What is tdlib? - (telegram database lib) The official telegram driver to interact with telegram APIs
- What is airgram? - A nodejs wrapper over the tdlib low level methods

###### Accessing Telegram API
https://core.telegram.org/api/obtaining_api_id

###### Airgram Docs
https://airgram.netlify.app/guides/getting-started

###### Telegram bots
https://core.telegram.org/bots.
If you are wondering why your bot isn't receiving a message do read up on [privacy mode](https://core.telegram.org/bots#privacy-mode)

###### TD Lib API
https://core.telegram.org/tdlib/getting-started

## Limitations
#### Only one bot per app
Due to the way the airgram works the auth, only one bot application can work per process.
But this can easily be worked around by starting as many processes for as many bots needed

#### Image size
- 1.2GB on windows 64 bit
- 800Mb on rPI4 ubuntu

Couldn't get it to build on an alpine image.

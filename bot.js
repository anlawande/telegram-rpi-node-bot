//Example script that sets it's commands, listens to a group for messages
//and responds to commands on that group

const { Airgram, Auth, toObject } = require('airgram');

const airgramBot = new Airgram({
    apiId: process.env.APP_ID,
    apiHash: process.env.APP_HASH,
    command: process.env.TDLIB_COMMAND,
    logVerbosityLevel: 2
});

airgramBot.use(new Auth({
    token: process.env.BOT_TOKEN
}));

const sharedGroupChatId = parseInt(process.env.SHARED_GROUP_ID);
const pauseCommand = /^\/command1/;
const continueCommand = /^\/command2/;

async function sendMessage(chatId, text) {
    console.log('Sending message');

    const chat = await airgramBot.api.sendMessage({
        chatId,
        inputMessageContent: {
            _: "inputMessageText",
            text: {
                text,
            }
        }
    });
    console.log(toObject(chat).content.text);
}

async function setBotCommands() {
    console.log("Setting Bot Commands");
    const chat = await airgramBot.api.setCommands({
        commands: [{
            command: 'command1',
            description: 'Command 1',
        },{
            command: 'command2',
            description: 'Command 2'
        }],
    });
    console.log(toObject(chat));
}

async function getChat(chatId) {
    console.log('Getting Chat');
    const chat = await airgramBot.api.getChat({
        chatId,
    });
    console.log(toObject(chat));
}

let init = false;
//Subscribe to initialization of connection with telegram API
airgramBot.use(async (ctx, next) => {
    if ('update' in ctx) {
        console.log(`[all updates][${ctx._}]`);
    }
    if (ctx._ === 'updateConnectionState' && !init) {
        init = true;
        await getChat(sharedGroupChatId);
        await setBotCommands();
    }
    return next()
});

//Subscribe to receive new messages
//See https://core.telegram.org/tdlib/getting-started for more handlers to subscribe to
airgramBot.on('updateNewMessage', async ({ update }) => {
    const { message } = update
    console.log(message);
    if (!message.content || message.content._ !== 'messageText') {
        return;
    }

    const text = message.content.text.text;
    if (message.chatId === sharedGroupChatId && pauseCommand.test(text)) {
        await sendMessage(sharedGroupChatId, "Received command 1");
    }
    if (message.chatId === sharedGroupChatId && continueCommand.test(text)) {
        await sendMessage(sharedGroupChatId, "Received command 2");
    }
});

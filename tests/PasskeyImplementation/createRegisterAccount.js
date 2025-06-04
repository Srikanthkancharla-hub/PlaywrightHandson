const channels=require('../PasskeyImplementation/channels');

async function createAccount() {
   const channelcount= channels.length;
    console.log('Channels count is :', channelcount);
};
createAccount();
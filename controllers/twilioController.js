// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);


client.messages.create({
    to: '+14258027715',
    from: process.env.TWILIO_PHONE_NUMBER,
    body: 'This is a texting test.'
}).then((message) => console.log(message.sid))
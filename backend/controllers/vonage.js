const { Vonage } = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "8437bd5e",
  apiSecret: "z6zkgUFDWSZzaHe1"
});

const from = "Vonage APIs"
const to = "+84869940163"
const text = 'A text message sent using the Vonage SMS API'
async function sendSMS(otpCode, phoneNumber) {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

module.exports = { sendSMS };
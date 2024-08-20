const express = require('express');
const bodyParser = require('body-parser');
const Twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const twilioClient = Twilio('ACccc604d6d52e607b3e6e3f8975d51d4c', 'f000abd81ca741399b7f73be86e152a5');
const VERIFY_SERVICE_SID = 'VA52a95e0fe706f8b165fd2617f859bd56';

app.post('/send-otp', (req, res) => {
    const { mobile, username } = req.body;
    const number = `+91${mobile.trim()}`;
    twilioClient.verify.services(VERIFY_SERVICE_SID)
        .verifications.create({ to: number, channel: 'sms' })
        .then(verification => res.json({ success: true }))
        .catch(error => res.json({ success: false, error: error.message }));
});

app.post('/verify-otp', (req, res) => {
    const { otp, mobile, username } = req.body;
    const number = `+91${mobile.trim()}`; 

    twilioClient.verify.services(VERIFY_SERVICE_SID)
        .verificationChecks.create({ to: number, code: otp })
        .then(verification_check => {
            if (verification_check.status === 'approved') {
                res.json({ success: true });
                sendSMS()
            } else {
                res.json({ success: false, error: 'Invalid OTP' });
            }
        })
        .catch(error => res.json({ success: false, error: error.message }));
});

async function sendSMS() {
    const waterUsage = 68;
    const number = "+916381577001";
    let message;

    if (waterUsage >= 100) {
        message = 'Warning: Water usage has reached 100%!';
    } else if (waterUsage >= 90) {
        message = 'Alert: Water usage has reached 90%!';
    } else if (waterUsage >= 50) {
        message = 'Notice: Water usage has reached 50%.';
    } else {
        // No response object in this context, so we should return a rejected promise
        return Promise.reject(new Error('Water usage is below threshold'));
    }

    try {
        const response = await twilioClient.messages.create({
            body: message,
            from: '+19383564018', // Replace with your Twilio phone number
            to: number
        });

        console.log(response.sid, "Message has been sent");
        // Success response
        return { success: true, message: response.sid };
    } catch (error) {
        console.error(error.message, "Message not sent");
        // Error response
        return { success: false, error: error.message };
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
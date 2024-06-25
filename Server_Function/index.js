const axios = require('axios');
const dotenv = require('dotenv');
const { google } = require('googleapis');
dotenv.config();
// Load environment variables from .env file

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];
const clientEmail = process.env.FCM_CLIENT_EMAIL;
const fcmPrivateKey = process.env.FCM_PRIVATE_KEY.replace(/\\n/g, '\n'); // Handle newlines in the private key

const getAccessToken = async () => {
    try {
        let jwtClient = new google.auth.JWT(
            clientEmail,
            null,
            fcmPrivateKey,
            SCOPES,
            null
        );
        const tokens = await jwtClient.authorize();
        return tokens.access_token;
    } catch (err) {
        console.error('Error obtaining access token:', err);
        throw err;
    }
};

// Example usage
(async () => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access Token:', accessToken);
        // You can now use the access token to make API requests
    } catch (err) {
        console.error('Error:', err);
    }
})();
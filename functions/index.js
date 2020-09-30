const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendNotification = functions.https.onCall((data, context) => {
	const {message, token} = data.data;

	console.log('token', message)
	admin.messaging().sendToDevice(token, message)
});
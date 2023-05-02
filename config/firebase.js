import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'nhentai-parser.firebaseapp.com',
  databaseURL:
        'https://nhentai-parser-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'nhentai-parser',
  storageBucket: 'nhentai-parser.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
export default app;
export const analytics = getAnalytics(app);

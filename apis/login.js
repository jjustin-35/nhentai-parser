import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../config/firebase.js';

const auth = getAuth(app);

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(`login with ${user.email} successfully`);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default login;

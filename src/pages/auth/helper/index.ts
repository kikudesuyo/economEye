import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authenticate = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    // const userCredential = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // const user = userCredential.user;
    return Promise.resolve();
  } catch (error: any) {
    throw new Error(error.code + error.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    // const userCredential = await signInWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // const user = userCredential.user;
    return Promise.resolve();
  } catch (error: any) {
    throw new Error(error.code + error.message);
  }
};

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(FirebaseAuth, googleProvider);
        /*const credentials = GoogleAuthProvider.credentialFromResult(response);
        console.log("signInWithGoogle", credentials);*/
        const { displayName, email, photoURL, uid } = response.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        console.error("signInWithGoogle", error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const registerUserWithEmailPassword = async (email, password, displayName) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = response.user;
        console.log("registerUserWithEmailPassword", response);
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        console.error("registerUserWithEmailPassword", error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

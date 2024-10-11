import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
            error: error.message,
        };
    }
};

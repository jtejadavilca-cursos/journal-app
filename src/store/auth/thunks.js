import { apiLogin, apiLoginGoogle } from "../../api/service";
import { registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCrendentials, login, logout, wrongCredentials } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        console.log("checkingAuthentication thunk", email, password);
        dispatch(checkingCrendentials());
        //const { token } = await apiLogin(email, password);

        const result = await signInWithEmailPassword(email, password);

        if (result.ok) {
            if (result.accessToken) {
                saveToken(result.accessToken);
            }
            return dispatch(login(result));
        }

        // if (token) {
        //     // get user info from token:
        //     const payload = JSON.parse(atob(token.split(".")[1]));
        //     console.log("payload", payload);

        //     localStorage.setItem("token", token);

        //     return dispatch(login(payload));
        // }

        handlingWrongCredentials(dispatch, "Invalid email or password");
    };
};

export const startGoogleAuthentication = () => {
    return async (dispatch) => {
        console.log("startGoogleSignIn thunk");
        dispatch(checkingCrendentials());

        const result = await signInWithGoogle();

        if (result.ok) {
            if (result.accessToken) {
                saveToken(result.accessToken);
            }
            return dispatch(login(result));
        }

        handlingWrongCredentials(dispatch, result.errorMessage);
    };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        console.log("startCreatingUserWithEmailPassword thunk", email, password, displayName);
        dispatch(checkingCrendentials());

        const { ok, errorMessage, uid, photoURL } = await registerUserWithEmailPassword(email, password, displayName);

        if (ok) {
            return dispatch(login({ uid, photoURL, displayName, email }));
        }

        handlingWrongCredentials(dispatch, errorMessage);
    };
};

const handlingWrongCredentials = (dispatch, errorMessage) => {
    dispatch(logout({ errorMessage }));
    dispatch(wrongCredentials(errorMessage));

    setTimeout(() => {
        dispatch(wrongCredentials(null));
    }, 5000);
};

const saveToken = (token) => {
    localStorage.setItem("token", token);
};

const getToken = () => {
    return localStorage.getItem("token");
};

const removeToken = () => {
    localStorage.removeItem("token");
};

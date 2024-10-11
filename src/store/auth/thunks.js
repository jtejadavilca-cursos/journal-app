import { apiLogin, apiLoginGoogle } from "../../api/service";
import { checkingCrendentials, login, logout, wrongCredentials } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        console.log("checkingAuthentication thunk", email, password);
        dispatch(checkingCrendentials());
        const { token } = await apiLogin(email, password);

        if (token) {
            dispatch(login());
            return;
        }

        dispatch(logout());
        dispatch(wrongCredentials("Invalid email or password"));

        setTimeout(() => {
            dispatch(wrongCredentials(null));
        }, 3000);
    };
};

export const startGoogleAuthentication = () => {
    return async (dispatch) => {
        console.log("startGoogleSignIn thunk");
        dispatch(checkingCrendentials());
        const { token } = await apiLoginGoogle("google", "google");

        if (token) {
            dispatch(login());
            return;
        }

        dispatch(logout());
        dispatch(wrongCredentials("Something went wrong with Google Sign In"));

        setTimeout(() => {
            dispatch(wrongCredentials(null));
        }, 3000);
    };
};

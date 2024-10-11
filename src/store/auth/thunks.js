import { apiLogin, apiLoginGoogle } from "../../api/service";
import { signInWithGoogle } from "../../firebase/providers";
import { checkingCrendentials, login, logout, wrongCredentials } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        console.log("checkingAuthentication thunk", email, password);
        dispatch(checkingCrendentials());
        const { token } = await apiLogin(email, password);

        if (token) {
            return dispatch(login());
        }

        /*dispatch(logout());
        dispatch(wrongCredentials("Invalid email or password"));

        setTimeout(() => {
            dispatch(wrongCredentials(null));
        }, 3000);*/
        handlingWrongCredentials(dispatch, "Invalid email or password");
    };
};

export const startGoogleAuthentication = () => {
    return async (dispatch) => {
        console.log("startGoogleSignIn thunk");
        dispatch(checkingCrendentials());

        const result = await signInWithGoogle();

        if (result.ok) {
            return dispatch(login(result));
        }

        console.log("Error", result);

        /*dispatch(logout());
        dispatch(wrongCredentials(result.error));

        setTimeout(() => {
            dispatch(wrongCredentials(null));
        }, 3000);*/

        handlingWrongCredentials(dispatch, result.error);
    };
};

const handlingWrongCredentials = (dispatch, error) => {
    dispatch(logout());
    dispatch(wrongCredentials(error));

    setTimeout(() => {
        dispatch(wrongCredentials(null));
    }, 5000);
};

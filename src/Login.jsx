import { loginWithGoogle } from "./firebase"
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider"
let Login = (props) => {
    let value = useContext(AuthContext);
    return (
        <div>
            {value ? <Redirect to="/home" /> : ""}
            <button onClick={() => {
                loginWithGoogle()
            }}>Sign in with Google</button>
        </div>
    )
}
export default Login;
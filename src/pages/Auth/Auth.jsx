import styles from "./Auth.module.scss";

import {useState} from "react";

import LoginForm from "../../components/Forms/LoginForm.jsx";
import RegisterForm from "../../components/Forms/RegisterForm.jsx";

const AuthPage = () => {

    const [ isRegistered, setRegistration ] = useState(true);

    const handleLogin = () => {
        setRegistration(true)
    }
    const handleRegister = () => {
        setRegistration(false)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper__image}>
                <img src="/logo.png" alt="Logo"/>
            </div>
            <div className={styles.wrapper__form}>
                <div className={styles.toggler}>
                    <button className={`${isRegistered ? styles.active_toggler : ""}`} onClick={handleLogin}>Login</button>
                    <button className={`${isRegistered ? "" : styles.active_toggler}`} onClick={handleRegister}>Register</button>
                </div>
                {
                    isRegistered ? <LoginForm/> : <RegisterForm/>
                }
            </div>
        </div>
    )
}

export default AuthPage;
import styles from './Forms.module.scss';

import {useRef} from "react";
import axios from "axios";

const LoginForm = () => {

    const formRef = useRef(null);

    const sendFormData = async (data) => {

        try {
            await axios.post("http://localhost:8000/api/v1/login/sing-in", data)
                .then( response => {
                    if (response.status === 200) {
                        const token = response.data.token;
                        localStorage.setItem("access-token", token);
                        window.location.href = "/";
                    }
                } );
        } catch (error) {
            alert(`${error.response.data.detail}`)
            window.location.reload()
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = formRef.current;

        if (form.name.value.trim().length < 3) {
            alert("Имя должно быть не короче 3 символов");
            return;
        }

        if (form.password.value.trim().length < 5) {
            alert("Пароль должен быть не короче 5 символов");
            return;
        }

        const formData = {
            name: form.name.value.trim(),
            password: form.password.value.trim(),
        }

        try {
            await sendFormData(formData);
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
                <div className={styles.formField}>
                    <label htmlFor="name">Login: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Введите имя"
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Введите пароль"
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm;
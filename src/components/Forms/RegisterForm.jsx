import styles from './Forms.module.scss';

import {useRef} from "react";
import axios from "axios";

const  RegisterForm = () => {

    const formRef = useRef(null);

    const sendFormData = async (data) => {
        try {
            await axios.post("http://localhost:8000/api/v1/login/sign-up", data)
                .then( response => {
                    if (response.status === 200) {
                        window.location.reload();
                    }
                } );
        } catch (error) {
            if (error.response) {
                alert(`${error.response.data.detail}`);
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
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
            confirmed_password: form.confirmed_password.value.trim(),
            email: form.email.value.trim()
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
                        placeholder="Login"
                        required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="name">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="name">Confirm Password: </label>
                    <input
                        type="password"
                        id="confirmed_password"
                        name="confirmed_password"
                        placeholder="Confirm Password"
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default RegisterForm;
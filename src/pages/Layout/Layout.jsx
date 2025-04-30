import styles from './Layout.module.scss';
import axios from "axios";

import Banner from "../../components/Banner/Banner.jsx";
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState} from "react";
import SideMenu from "../../components/SideMenu/SideMenu.jsx";

import {getAccessToken} from "../../helpers/auth.js";

import {decodeToken} from "../../helpers/auth.js";



const Layout = () => {

    const location = useLocation();
    const navigator = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const get_current_user = async () => {
            const token = getAccessToken()

            if (!token) {
                navigator("/login")
                return
            }

            try {
                const response = await axios("http://localhost:8000/api/v1/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    navigator("/login");
                    return false
                }

                const res = await decodeToken(token);

                if (res) {
                    const data = {
                        "name": res.name,
                        "email": res.email,
                    }
                    localStorage.setItem("user-data", JSON.stringify(res));
                    setUser(data);
                }

            } catch (error) {
                console.error("Ошибка авторизации:", error);
                navigator("/login");
            }
        };

        get_current_user()


    }, []);

    return (
        <div className={styles.layout}>
            <Banner user={user}/>

            <div className={styles.main}>
                { location.pathname.startsWith("/login") || !user ? "" : (
                    <div className={styles.sidebar}>
                        <SideMenu name={user.name} />
                    </div>
                )}

                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;
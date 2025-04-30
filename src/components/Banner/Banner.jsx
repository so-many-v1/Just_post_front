import styles from "./Banner.module.scss"
import {Link} from "react-router-dom";

const Banner = (props) => {

    const handleLogout = () => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("user-data");
        props.user = null
        window.location.reload();
    }

    return (
        <div className={styles.banner}>
            <div className={styles.wrapper}>
                <div className={styles.banner__logo}>
                    <img src="/logo.png" alt="logo"/>
                    <div className={styles.logo__name}>Just Post</div>
                </div>
                {
                    props.user ?
                        <div className={styles.banner__profile}>
                            <Link to={`/profile/${props.user.name}`}>{props.user.name}</Link>
                            <p>|</p>
                            <Link onClick={handleLogout} to={`/login`}>Logout</Link>

                        </div>
                        :   <Link to="/login">Login / Register</Link>
                }
            </div>
        </div>
    )
}

export default Banner
import styles from './SideMenu.module.scss';
import {Link} from "react-router-dom";

const SideMenu = (props) => {


    return (

        <ul>
            <li>
                <img src="https://img.icons8.com/?size=20&id=12438&format=png&color=051287" alt=""/>
                <Link to={`profile/${props.name}`}>Profile</Link>
            </li>
            <li>
                <img src="https://img.icons8.com/?size=20&id=jJQuWM4lhcor&format=png&color=051287" alt=""/>
                <Link to="/">Posts</Link>
            </li>
            <li>
                <img src="https://img.icons8.com/?size=20&id=3726&format=png&color=051287" alt=""/>
                <Link to="/">Messages</Link>
            </li>
            <li>
                <img src="https://img.icons8.com/?size=20&id=37965&format=png&color=051287" alt=""/>
                <Link to="/" >Friends</Link>
            </li>
            <li>
                <img src="https://img.icons8.com/?size=20&id=14089&format=png&color=051287" alt=""/>
                <Link to="/" >Photos</Link>
            </li>
            <li>
                <img src="https://img.icons8.com/?size=20&id=48537&format=png&color=051287" alt=""/>
                <Link to="/" >Videos</Link>
            </li>
        </ul>
    )
}

export default SideMenu;
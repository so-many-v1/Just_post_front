import styles from "./Post.module.scss";

import {useLocation} from "react-router-dom";
import axios from "axios";

import {getAccessToken} from "../../helpers/auth.js";
import {useState} from "react";

import DeletePostModal from "../../components/Modals/DeletePost.jsx";


const Post = (props) => {

    const location = useLocation()
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const confirmDelete = async () => {
        await handleDeletePost();
        closeModal();
    };

    const handleDeletePost = async () => {

        const token = getAccessToken()

        await axios.delete(`http://localhost:8000/api/v1/delete-post/${props.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            if (res.status === 200) {
                window.location.reload()
            } else {
                alert("Try again later.")
            }
        })
    }
    return (
        <>
        <div className={styles.post}>
            <div className={styles.header}>
                <h3>Title: {props.title}</h3>
                <div className={styles.header__info}>
                    <div className={styles.header__info_meta}>
                        { location.pathname.startsWith("/profile") ? "" : <p className={styles.date}>Author: {props.writer}</p> }
                        <p className={styles.date}>{props.created_at}</p>
                    </div>

                    {
                        location.pathname.startsWith("/profile") && props.isOwner ? (
                            <div className={styles.header__info_delete}>
                                <img onClick={openModal} src="https://img.icons8.com/?size=20&id=OD5jprZTbcDK&format=png&color=000000" alt="Delete post"/>
                            </div>
                        ) : ""
                    }
                </div>

            </div>
            <div className={styles.content}>
                <p>{props.content}</p>
            </div>
        </div>
        {modalVisible && (
            <DeletePostModal
                onConfirm={confirmDelete}
                onCancel={closeModal}
            />
        )}
    </>
    );
};

export default Post;

import { useState, useRef } from "react";
import styles from "./WritePost.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WritePost = () => {

    const formRef = useRef(null);
    const navigate = useNavigate();
    const usetData = JSON.parse(localStorage.getItem("user-data"));

    const handleSubmit = async (e) => {

        const token = localStorage.getItem("access-token");
        e.preventDefault();

        const form = formRef.current;

        const data = {
            "title": form.title.value.trim(),
            "content": form.content.value.trim(),
        }

        try {
            await axios.post("http://localhost:8000/api/v1/write-post", data
            , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/profile/${usetData.name}`);
        } catch (err) {
            console.error("Ошибка при создании поста", err);
        }
    };

    return (
        <div className={styles.write}>
            <h2>Write post</h2>
            <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    required
                />
                <textarea
                    name="content"
                    placeholder="Write your post"
                    required
                ></textarea>
                <button type="submit">Publish</button>
            </form>
        </div>
    );
};

export default WritePost;
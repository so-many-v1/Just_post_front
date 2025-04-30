import styles from "./Home.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../../components/Post/Post.jsx";

import {Outlet, useNavigate, useLocation} from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const get_posts = async () => {
            const token = localStorage.getItem("access-token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios("http://localhost:8000/api/v1/posts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(res => {
                    setPosts(res.data.posts)
                    setLoading(false);
                });

                if (response.status !== 200) {
                    navigator("/login");
                    return false
                }

            } catch (error) {
                console.error("Ошибка авторизации:", error);
                navigator("/login");
            }
        };

        get_posts();


    }, []);
    return (
        <div className={styles.homepage}>
            <h1>Home page</h1>
            <h2>Latest Posts:</h2>
            { loading ? "Loading..." : posts.map((post) => (<Post key={post.id}
                                                                  post={post}
                                                                  title={post.post_title}
                                                                  content={post.post_content}
                                                                  created_at={post.created_at}
                                                                  writer={post.username}/>)) }
        </div>
    )
}

export default Home
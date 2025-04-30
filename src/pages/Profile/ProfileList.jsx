import styles from './Profile.module.scss'
import Post from "../../components/Post/Post.jsx";

const PostList = (props) => {
    if (!props.posts || props.posts.length === 0) {
        return <div className={styles.profile__content_post}>No posts yet.</div>
    }

    return props.posts.map((post) => (
        <Post
            key={post.id}
            id={post.id}
            writer={post.writer}
            title={post.post_title}
            content={post.post_content}
            created_at={post.created_at}
            isOwner={props.isOwner}
        />
    ));
}

export default PostList;
import styles from './Profile.module.scss'

const ProfileHeader = (props) => {
    return (
        <div className={styles.profile__info}>
            <div className={styles.profile__info_name}>
                <h2>{props.username}</h2>
            </div>
            <div className={styles.profile__info_follow}>
                <p>Followers: {props.followers_amount}</p>
                <p>Following: {props.following_amount}</p>
            </div>
        </div>
    )
}

export default ProfileHeader;
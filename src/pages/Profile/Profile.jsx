import styles from './Profile.module.scss'

import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";


import {fetchProfileInfo} from "./ProfileApi.js";
import ProfileHeader from "./ProfileHeader.jsx";
import PostList from "./ProfileList.jsx";
import ProfileFollowBtn from "./ProfileFollowBtn.jsx";




const Profile = () => {

    const {username} = useParams()
    const userData = JSON.parse(localStorage.getItem("user-data"));
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const isOwnProfile = userData?.name === username;

    const FetchData = async () => {
        try {
            const data = await fetchProfileInfo(username)
            console.log(data.data)
            setUserInfo(data.data)
            setLoading(false);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {

        const FetchData = async () => {
            try {
                const data = await fetchProfileInfo(username)
                console.log(data.data)
                setUserInfo(data.data)
                setLoading(false);
            } catch (err) {
                console.log(err.message)
            }
        }
        FetchData()
        }, [username])

    return (
        loading ? <div>Loading...</div> : (
            <div className={styles.profile}>
                <ProfileHeader username={username} followers_amount={userInfo.followers_amount} following_amount={userInfo.following_amount} />
                <div className={styles.profile__content}>
                    {
                        isOwnProfile ? (
                        <div className={styles.profile__content_writer}>
                            <Link to="/write-post">Write post</Link>
                        </div>
                        ) : (
                            <ProfileFollowBtn username={userData.name} page_owner={username} func={FetchData}/>
                        )
                    }
                    <PostList posts={userInfo.posts} isOwner={isOwnProfile} />
                </div>
            </div>
        )
    );
}

export default Profile;
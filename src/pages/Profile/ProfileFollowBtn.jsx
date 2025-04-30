import styles from './Profile.module.scss'

import {useEffect, useState} from "react";
import axios from "axios";

import {getAccessToken} from "../../helpers/auth.js";


const ProfileFollowBtn = (props) => {

    const [follow, setFollow] = useState(false)

    const handleSubscribe = async () => {
        const token = getAccessToken()
        try {
            const data = await axios.post(`http://localhost:8000/api/v1/profile/${props.username}/subscribe`,
                {
                    following_to_username : props.page_owner
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (data.status === 200) {
                setFollow(true)
                await props.func()
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleUnSubscribe = async () => {
        const token = getAccessToken()
        try {
            const data = await axios.delete(`http://localhost:8000/api/v1/profile/${props.username}/unsubscribe`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    following_to_username : props.page_owner
                }
            })

            if (data.status === 200) {
                setFollow(false)
                await props.func()
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {

        const fetchFollowInfo = async () =>{
            const token = getAccessToken()
            try {
                const data = await axios.post(`http://localhost:8000/api/v1/profile/${props.username}/subscription-status`,{
                    "following_to_username" : props.page_owner
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                if (data.data.subscribed === true) {
                    setFollow(true)
                }

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchFollowInfo()

    }, []);

    return (
        follow ? (
            <div className={styles.sub_btn} onClick={handleUnSubscribe}>
                <p>Unsubscribe</p>
            </div>
            ) : (
            <div className={styles.unsub_btn} onClick={handleSubscribe}>
                <p>Subscribe</p>
            </div>
        )
    )

}

export default ProfileFollowBtn
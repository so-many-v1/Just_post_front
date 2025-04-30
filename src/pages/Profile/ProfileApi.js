import axios from "axios";
import {getAccessToken} from "../../helpers/auth.js";

export const fetchProfileInfo = async (username) => {

    const token = getAccessToken()

    const result = await axios.get(`http://localhost:8000/api/v1/profile/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return result;
}
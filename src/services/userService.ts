import axios from "axios";

class userService {
    signup = async (username: string, password: string, email: string) => {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/register",
            {
                username: username,
                password: password,
                email: email
            }
        );
        return res.data;
    }

    login = async (username: string, password: string) => {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/login",
            {
                username: username,
                password: password
            }
        );
        return res.data;
    }
}

export const UserService = new userService();
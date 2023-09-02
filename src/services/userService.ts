import axios from "axios";

class userService {
    headers = {
        'Content-Type': 'application/json',
    };
    signup = async (username: string, password: string, email: string) => {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/register",
            {
                username: username,
                password: password,
                email: email
            },
            {
                headers: this.headers
            }
        );
        return res.data;
    }

    login = async (username: string, password: string) => {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/login",
            {
                username: username,
                password: password
            },
            {
                headers: this.headers
            }
        );
        return res.data;
    }
}

export const UserService = new userService();
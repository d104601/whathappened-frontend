import axios from "axios";

class userService {
    signup = (username: string, password: string, email: string) => {
        return axios.post(process.env.REACT_APP_SERVER_URL + "/api/user/register", 
            {
                username: username,
                password: password,
                email: email
            }
        ).then((res) => {
            return res.data;
        }
        );
    }
}

export const UserService = new userService();
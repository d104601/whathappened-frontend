import axios from "axios";
import {auth} from "../config/auth";

class newsService {
    async loadTrending(mkt: String) {
        try {
            return await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/trend", {
                params: {
                    mkt: mkt
                }
            });
        } catch {
            // if error, try again with 2 sec
            setTimeout(() => {
                this.loadTrending(mkt);
            }, 2000);
        }
    }

    loadCategoryNews(mkt: String, category: String) {
        let params: any = {
            mkt: mkt,
        };

        if(category !== "") {
            params["category"] = category;
        }

        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/category", {
            params: params,
        });
    }

    saveArticle(article: any) {
        if(auth.isLoggedIn()) {

        }
        else {
            window.location.href = "/login";
        }
    }
}

export const NewsService = new newsService()
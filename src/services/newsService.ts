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
            const config = {
                headers: {
                    'Authorization': "Bearer " + auth.getToken()
                }
            };
            
            return axios.put(process.env.REACT_APP_SERVER_URL + "/api/news/save", article, config)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            }
            );
        }
        else {
            window.location.href = "/login";
        }
    }

    async loadSavedArticles() {
        try {
            const config = {
                headers: {
                    'Authorization': "Bearer " + auth.getToken()
                }
            };
            return await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/saved", config).then((res) => {
                console.log(res);
                return res.data === "" ? [] : res.data;
            });   
        } catch {
            console.log("Error loading saved articles");
        } 
    }

    async deleteSavedArticle(article: any) {
        try {
            const config = {
                headers: {
                    'Authorization': "Bearer " + auth.getToken()
                }
            };
            return await axios.put(process.env.REACT_APP_SERVER_URL + "/api/news/delete", article, config).then((res) => {
                // if data is not array, return empty array
                if(res.data === "") {
                    return [];
                }
                return res.data;
            });
        } catch {
            console.log("Error deleting saved articles");
        }
    }
}

export const NewsService = new newsService()
import axios from "axios";
import {auth} from "../config/auth";


class newsService {
    async loadTrending(mkt: String) {
        try {
            const headers = {
                'Access-Control-Allow-Origin': '*'
            }

            return await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/trend", {
                params: {
                    mkt: mkt
                },
                headers: headers
            });
        } catch(e) {
            console.log("Error loading trending news");
            console.log(e);
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
            },
        );
    }

    saveArticle(article: any) {
        if(auth.isLoggedIn()) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + auth.getToken()
                }
            };

            return axios.put(process.env.REACT_APP_SERVER_URL + "/api/news/save", article, config)
            .then((res) => {
                console.log(res);
                // if article is saved successfully, return "success"
                if(res.data === "success") {
                    return "success";
                }
                // if article is already saved, return "already saved"
                else if(res.data === "already saved") {
                    return "already saved";
                }
                // if article is not saved, return "error"
                else {
                    return "error";
                }
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
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + auth.getToken()
                }
            };
            return await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/saved", config).then((res) => {
                console.log(res);
                // if 401, return error
                if(res.status !== 200) {
                    return "error";
                }
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
                    'Content-Type': 'application/json',
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
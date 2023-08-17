import {useState, useEffect} from "react";
import axios from "axios";
import NewsCard from "./newsCard";
import saveArticle from "../services/saveArticle";

interface weather {
    name: string,
    main: {
        temp: number,
    }
    weather: [
        {
            main: string,
            description: string,
            icon: string,
        }
    ]
}

const Main = () => {
    const [mkt, setMkt] = useState("en-US");
    const [Trending, setTrending] = useState([]);
    const [weather, setWeather] = useState({} as weather);
    const [News, setNews] = useState([]);

    const loadTrending = async (mkt: String) => {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/trend", {
                params: {
                    mkt: mkt
                }
            }).then((response) => {
                return response;
            }).catch(() => {
            // if error, try again with 2 sec
            setTimeout(() => {
                loadTrending(mkt);
            }, 2000);
        });

        setTrending(response?.data.value);
    };

    const loadWeather = async (city: String) => {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/weather", {
            params: {
                city: city
            }
        }).then((response) => {
            return response;
        });

        console.log(response.data);
        setWeather(response.data);
    }

    const loadCategoryNews = async (category: string) => {
        let params: any = {
            mkt: mkt,
        };

        if(category !== "") {
            params["category"] = category;
        }

        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/category", {
            params: params,
        }).then((response) => {
            console.log(response);
            return response;
        });

        setNews(response?.data.value);
    }

    useEffect(() => {
        const geoData = async () => {
            await axios.get("https://api.ipgeolocation.io/ipgeo", {
                params: {
                    apiKey: process.env.REACT_APP_GEOLOCATIONAPI_KEY,
                }
            }
            ).then((response) => {
                return response.data;
            }).then((data) => {
                loadWeather(data.city);

                if(data.country_code2 === "GB") {
                    setMkt("en-GB");
                } else if(data.country_code2 === "CN") {
                    setMkt("zh-CN");
                } else if(data.country_code2 === "FR") {
                    setMkt("fr-FR");
                } else if(data.country_code2 === "DE") {
                    setMkt("de-DE");
                } else if(data.country_code2 === "CA") {
                    setMkt("en-CA");
                }
            }).then(() => {
                loadTrending(mkt);
                loadCategoryNews("");
            });
        };

        geoData();
    }, []);

    return (
        <div>
            <section className="hero has-text-centered">
                <div className="hero-body">
                    <p className="title">
                        What Happened?
                    </p>
                    <p className="subtitle">
                        Here's what happened today.
                    </p>
                </div>
            </section>
            <div className="columns">
                <div className="column">
                    <h1 className="title">Weather</h1>
                    <div className="card m-3">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content has-text-centered">
                                    {
                                        weather.name !== undefined
                                        &&
                                        <>
                                            <p className="is-size-4">{weather.name}</p>
                                            <img
                                                src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"}
                                                alt="weather icon"/>
                                            <p className="is-size-3">{Math.round((weather.main.temp))}°F</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="title">News by Category</h1>
                    <div className='control'>
                        Category:
                        <div className='select is-small'>
                            <select onChange={(e) => {
                                loadCategoryNews(e.target.value);
                            }}>
                                <option value=''>Select Category</option>
                                <option value='business'>Business</option>
                                <option value='entertainment'>Entertainment</option>
                                <option value='health'>Health</option>
                                <option value='politics'>Politics</option>
                                <option value='scienceandtechnology'>Science and Technology</option>
                                <option value='sports'>Sports</option>
                            </select>
                        </div>
                    </div>
                    <div className="mainBox scrollable">
                        {
                            News !== undefined
                            &&
                            News.map((article: any, index: number) => {
                                return (
                                    <div key={index} className="is-clipped">
                                        <NewsCard
                                            article={article}
                                            index={index}
                                            srcPage="search"
                                            buttonAction={saveArticle}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="column">
                    <h1 className="title">Trending</h1>
                    <div className="mainBox scrollable">
                        {
                            Trending !== undefined
                            &&
                            Trending.map((trend: any, index: number) => {
                                return (
                                    <div className='card m-3' key={index}>
                                        <div className='card-content'>
                                            <div className='media'>
                                                {trend.image !== undefined
                                                    &&
                                                    <div className='media-left'>
                                                        <figure className='image is-48x48'>
                                                            <img src={trend.image.url} alt='not available'/>
                                                        </figure>
                                                    </div>
                                                }
                                                <div className='media-content'>
                                                    <p className='title is-4'><a
                                                        href={trend.webSearchUrl}>{trend.name}</a>
                                                    </p>
                                                    <p className='subtitle is-6'>{trend.query.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
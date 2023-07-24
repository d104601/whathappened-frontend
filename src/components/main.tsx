import {useState, useEffect} from "react";
import axios from "axios";
import NewsCard from "./newsCard";

import saveArticle from "../services/saveArticle";

interface weather {
    timezone: string,
    current: {
        temp: number,
        weather: [
            {
                main: string,
                description: string,
                icon: string
            }
        ]
    }
}

const Main = () => {
    const [Trending, setTrending] = useState([]);

    const [weather, setWeather] = useState({} as weather);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [geoStatus, setGeoStatus] = useState(false);
    const [appid] = useState(process.env.REACT_APP_WEATHERAPI_KEY);

    const [News, setNews] = useState([]);

    const loadTrending = async () => {
        // get country using geolocation
        const response = await axios.get("https://api.ipify.org?format=json").then((response) => {
            return response.data.ip;
        }).then((ip) => {
            return axios.get("https://ipapi.co/" + ip + "/country_code/").then((response) => {
                return response.data;
            });
        }).then((countryCode) => {
            let mkt = "";
            if (countryCode === "US") {
                mkt = "en-US";
            } else if (countryCode === "GB") {
                mkt = "en-GB";
            } else if (countryCode === "CN") {
                mkt = "zh-CN";
            } else if (countryCode === "FR") {
                mkt = "fr-FR";
            } else if (countryCode === "DE") {
                mkt = "de-DE";
            } else if (countryCode === "CA") {
                mkt = "en-CA";
            }

            return mkt;
        }).then((mkt) => {
            return axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/trend", {
                params: {
                    mkt: mkt
                }
            }).then((response) => {
                return response;
            });
        }).catch((error) => {
            // if error, try again with 2 sec
            setTimeout(() => {
                loadTrending();
            }, 2000);
        });

        setTrending(response?.data.value);
    };

    const loadWeather = async () => {
        console.log(lat, long, appid)
        const response = await axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + appid).then((response) => {
            return response;
        });

        console.log(response.data);
        setWeather(response.data);
    }

    const loadCategoryNews = async (category: string) => {
        let url = "https://api.bing.microsoft.com/v7.0/news";

        if (category !== "") {
            url += "?category=" + category;
        }
        const response = await axios.get(url, {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.REACT_APP_BING_SUBSCRIPTION_KEY,
            },
        }).then((response) => {
            console.log(response);
            return response;
        }).catch((error) => {
            if(error.response.status === 429) {
                // wait 2 seconds and try again
                setTimeout(() => {
                    loadCategoryNews(category);
                }, 2000);
            }
        });

        setNews(response?.data.value);
    }

    useEffect(() => {
        const setLatLong = () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
                setGeoStatus(true);
            });
        }
        loadTrending();
        loadCategoryNews("");
        setLatLong();
    }, []);

    useEffect(() => {
        if (geoStatus) {
            loadWeather();
        }
    }, [geoStatus]);

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
                                        weather.current !== undefined
                                        &&
                                        <>
                                            <p className="is-size-4">{weather.timezone}</p>
                                            <img src={"http://openweathermap.org/img/w/" + weather.current.weather[0].icon + ".png"} alt="weather icon"/>
                                            <p className="is-size-3">{Math.round((weather.current.temp - 273.15) * 9 / 5 + 32)}°F</p>
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
                                                <p className='title is-4'><a href={trend.webSearchUrl}>{trend.name}</a>
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
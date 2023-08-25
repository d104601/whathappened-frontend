import {useState, useEffect} from "react";
import NewsCard from "./newsCard";
import {NewsService} from "../services/newsService";
import {OtherService} from "../services/otherService";

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
        const response = await NewsService.loadTrending(mkt);
        setTrending(response?.data.value);
    };

    const loadWeather = async (city: String) => {
        const response = await OtherService.loadWeatherData(city);
        setWeather(response.data);
    }

    const loadCategoryNews = async (category: string) => {
        const response = await NewsService.loadCategoryNews(mkt, category);
        setNews(response?.data.value);
    }

    useEffect(() => {
        OtherService.getLocationData()
            .then((response) => {
                loadWeather(response.city).then(r => console.log(r));
                setMkt(OtherService.getMktCode(response.country_code2));
            })
            .then(() => {
                loadTrending(mkt).then(r => console.log(r));
                loadCategoryNews("").then(r => console.log(r));
            });
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
                                            buttonAction={NewsService.saveArticle}
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
                                                {trend.image !== null
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
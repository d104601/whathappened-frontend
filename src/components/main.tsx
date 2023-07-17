import {useState, useEffect} from "react";
import axios from "axios";


const Main = () => {
    const [Trending, setTrending] = useState([]);

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
            return axios.get("https://api.bing.microsoft.com/v7.0/news/trendingtopics?mkt=" + mkt, {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.REACT_APP_BING_SUBSCRIPTION_KEY,
                },
            }).then((response) => {
                return response;
            });
        });

        console.log(response.data.value);
        setTrending(response.data.value);
    };

    useEffect(() => {
        loadTrending();
    }, []);


    return (
        <div>
            <section className="hero has-text-centered">
                <div className="hero-body">
                    <p className="title">
                        What Happened?
                    </p>
                    <p className="subtitle">
                        Here's what happened in your location today.
                    </p>
                </div>
            </section>
            <div className="columns">
                <div className="column is-one-fifth">
                    <h1 className="title">Weather</h1>
                </div>
                <div className="column">
                    <h1 className="title">Trending</h1>
                    {
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
                            )
                        })
                    }
                </div>
                <div className="column">
                    <h1 className="title">News by Category</h1>
                </div>
            </div>
        </div>
    );
}

export default Main;
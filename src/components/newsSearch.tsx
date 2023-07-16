import {useState, FormEvent} from 'react';
import axios from 'axios';

import NewsCard from './newsCard';

const NewsSearch = () => {
    const [SearchTerm, setSearchTerm] = useState("");
    const [SearchOption, setSearchOption] = useState(0);
    const [SearchLocation, setSearchLocation] = useState("");
    const [SearchCategory, setSearchCategory] = useState("");
    const [SearchPeriod, setSearchPeriod] = useState("");

    const [SearchResults, setSearchResults] = useState([]);
    const [SubscriptionKey] = useState(process.env.REACT_APP_BING_SUBSCRIPTION_KEY);

    async function search(e: FormEvent) {
        e.preventDefault();
        setSearchResults([]);

        let url = "https://api.bing.microsoft.com/v7.0/news/"

        if(SearchTerm !== "") {
            url += "search?q=" + encodeURIComponent(SearchTerm);
        }
    
        if(SearchOption === 1) {
            if(SearchTerm !== "") {
                url += "&";
            }
            else {
                url += "?";
            }
            url += SearchLocation + SearchCategory + SearchPeriod + "&sortBy=Relevance";
        }
        
        console.log(url);
        const response = await axios.get(url, {
            headers: {
                'Ocp-Apim-Subscription-Key': SubscriptionKey,
            },
        }).then((response) => {
            console.log(response);
            return response;
        });

        console.log(response.data.value);

        setSearchResults(response.data.value);
    }

    const saveArticle = (article: any) => {
        //save article into local storage
        let articles = localStorage.getItem("articles");
        if (articles === null) {
            articles = "[]";
        }
        // convert the string into an array
        let articlesArray = JSON.parse(articles);
    
        if (!articlesArray.includes(article)) {
            articlesArray.push(article);
            localStorage.setItem("articles", JSON.stringify(articlesArray));
        }
    }

    return (
        <div>
            <section className='section has-text-centered'>
                <form onSubmit={search}>
                    {SearchResults.length === 0 && 
                    <>
                        <h1 className='title'>News Search</h1>
                        <p className='subtitle'>Powered by Bing News Search API</p>
                    </>
                    }
                    <div className="field has-addons has-addons-centered">
                        <div className="control">
                            <input
                                placeholder={"Search news here"}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                }}
                                className={"input is-info"}
                                type='text'
                            />
                        </div>
                        <div className='control'>
                            <button
                                type={"submit"}
                                className={"button is-info"}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    {
                        SearchOption === 0 &&
                            <button className='button is-small' onClick={()=> setSearchOption(1)}>See more search option</button>
                    }
                    {
                        SearchOption === 1 && 
                        <>
                            <button className='button is-small' onClick={()=> setSearchOption(0)}>Hide search option</button>
                            <div className="columns mt-1 is-1">
                                <div className="column">
                                    <div className="control">
                                        Location: 
                                        <div className='select is-small'>
                                            <select onChange={(e) => {
                                                setSearchLocation(e.target.value)
                                            }}>
                                                <option value="">All</option>
                                                <option value="mkt=en-US">United States</option>
                                                <option value="mkt=en-CA">Canada</option>
                                                <option value="mkt=en-GB">United Kingdom</option>
                                                <option value="mkt=en-AU">Australia</option>
                                                <option value="mkt=zh-CN">China</option>
                                                <option value="mkt=en-IN">India</option>
                                                <option value="mkt=ja-JP">Japan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="control">
                                        Category: 
                                        <div className='select is-small'>
                                            <select onChange={(e) => {
                                                setSearchCategory(e.target.value)
                                            }}>
                                                <option value="">All</option>
                                                <option value="&category=business">Business</option>
                                                <option value="&category=entertainment">Entertainment</option>
                                                <option value="&category=health">Health</option>
                                                <option value="&category=politics">Politics</option>
                                                <option value="&category=scienceAndTechnology">Science and Technology</option>
                                                <option value="&category=sports">Sports</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="control">
                                        Posted within:
                                        <div className='select is-small'>
                                            <select onChange={(e) => {
                                                setSearchPeriod(e.target.value)
                                            }}>
                                                <option value="">All</option>
                                                <option value="&freshness=Day">today</option>
                                                <option value="&freshness=Week">past week</option>
                                                <option value="&freshness=Month">past month</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </form>
            </section>

            <section className='container'>
                {SearchResults.map((result: any, index: number) => {
                    return (
                        <div key={index}>
                            <NewsCard
                                article={result}
                                srcPage="search"
                                index={index}
                                buttonAction={saveArticle}
                            />
                        </div>
                    )
                })}
            </section>
        </div>
    );
}

export default NewsSearch;
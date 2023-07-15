import {useState, FormEvent} from 'react';
import axios from 'axios';

import NewsCard from '../components/newsCard';

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
        let url = "https://api.bing.microsoft.com/v7.0/news/search?q="+encodeURIComponent(SearchTerm);

    
        if(SearchOption === 1) {
            url += SearchLocation + SearchCategory + SearchPeriod + "sortBy=Relevance";
        }
        
        const response = await axios.get(url, {
            headers: {
                'Ocp-Apim-Subscription-Key': SubscriptionKey,
                'Accept-Language': 'en-US, fr-FR, ko-KR, cn-CN, ja-JP, it-IT, de-DE, hi-IN, es-ES',
                'Accept': 'application/json',
            },
        })

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
                                // longer search bar
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
                                                <option value="&cc=us">United States</option>
                                                <option value="&cc=au">Australia</option>
                                                <option value="&cc=ca">Canada</option>
                                                <option value="&cc=cn">China</option>
                                                <option value="&cc=fr">France</option>
                                                <option value="&cc=de">Germany</option>
                                                <option value="&cc=in">India</option>
                                                <option value="&cc=it">Italy</option>
                                                <option value="&cc=jp">Japan</option>
                                                <option value="&cc=kr">South Korea</option>
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
                                                <option value="&category=Business">Business</option>
                                                <option value="&category=Entertainment">Entertainment</option>
                                                <option value="&category=Health">Health</option>
                                                <option value="&category=Politics">Politics</option>
                                                <option value="&category=ScienceAndTechnology">Science and Technology</option>
                                                <option value="&category=Sports">Sports</option>
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
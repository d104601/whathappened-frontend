import {useState, FormEvent} from 'react';
import axios from 'axios';

import NewsCard from '../components/newsCard';

const NewsSearch = () => {
    const [SearchTerm, setSearchTerm] = useState("");
    const [SearchOption, setSearchOption] = useState(0);
    const [SearchLocation, setSearchLocation] = useState("");

    const [SearchResults, setSearchResults] = useState([]);
    const [SubscriptionKey] = useState(process.env.REACT_APP_BING_SUBSCRIPTION_KEY);

    async function search(e: FormEvent) {
        e.preventDefault();
        const count = "&count=20"
        // get mkt value from select option
        let url = "https://api.bing.microsoft.com/v7.0/news/search?q=" + encodeURIComponent(SearchTerm) + count;
        if(SearchOption === 1) {
            const mkt = "&mkt=" + SearchLocation;
            url += mkt;
        }
        console.log(url);
        const response = await axios.get(url, {
            headers: {'Ocp-Apim-Subscription-Key': SubscriptionKey}
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
                            <button onClick={()=> setSearchOption(1)}>See more search option</button>
                    }
                    {
                        SearchOption === 1 && 
                        <>
                            <button onClick={()=> setSearchOption(0)}>Hide search option</button>
                            <div className="field">
                                Location: 
                                <div className="control">
                                    <div className='select'>
                                        <select onChange={(e) => {
                                            setSearchLocation(e.target.value)
                                        }}>
                                            <option value="en-US">United States</option>
                                        </select>
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
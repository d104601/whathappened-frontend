import {useState, FormEvent} from 'react';
import axios from 'axios';

function cuttingDate(date: string) {
    return date.substring(0, 10);
}

function saveArticle(article: any) {
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

const NewsSearch = () => {
    const [SearchTerm, setSearchTerm] = useState("");
    const [SearchResults, setSearchResults] = useState([]);
    const [SubscriptionKey] = useState(process.env.REACT_APP_BING_SUBSCRIPTION_KEY);

    async function search(e: FormEvent) {
        e.preventDefault();
        const url = "api.bing.microsoft.com/v7.0/news/search";
        const response = await axios.get(`https://${url}?q=${encodeURIComponent(SearchTerm)}&count=20`, {
            headers: { 'Ocp-Apim-Subscription-Key': SubscriptionKey }
        })

        setSearchResults(response.data.value);
    }

    return (
        <div>
            <form onSubmit={search}>
                <div className="field has-addons">
                    <div className="control">
                        <input
                        placeholder={"Search news here"}
                        onChange={(e) => { setSearchTerm(e.target.value) }}
                        className={"input"}
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
            </form>


            <div>
                {SearchResults.map((result: any, index: number) => {
                    return (
                        <div className='card' key={index}>
                            <div className='card-content'>
                                <div className='media'>
                                    <div className='media-content'>
                                        <p className='title is-4'><a href={result.url}>{result.name}</a></p>
                                        <p className='subtitle is-6'>{result.provider[0].name} {cuttingDate(result.datePublished)} {result.category}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='content'>
                                <p>{result.description}....</p>
                            </div>
                            <button className='button is-dark' onClick={() => saveArticle(result)}>Save this article</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default NewsSearch;
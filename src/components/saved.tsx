import {useState, useEffect} from "react";
import 'bulma/css/bulma.css'
import NewsCard from "./newsCard";
import {NewsService} from "../services/newsService";

function getSavedArticle() {
    return NewsService.loadSavedArticles();
}

const Saved = () => {
    // set saved articles to be an empty array of any type
    const [SavedArticles, setSavedArticles] = useState<any>([]);
    const [error, setError] = useState("No saved articles now.");

    // When component is loaded or saved articles changes, update the saved articles
    useEffect(() => {
        const getData = async () => {
            const data = await getSavedArticle();
            if(data !== ""){
                setSavedArticles(data);
            }
        }

        try {
            getData();
        } catch (e) {
            setError("Failed to load saved articles.");
        }
    }, []);

    const removeArticle = async (article: any) => {
        const data = await NewsService.deleteSavedArticle(article);
        console.log(data);
        setSavedArticles(data);
    }

    return (
        <div>
            <section className={`hero ${SavedArticles.length === 0 && "is-large"}`}>
                <div className='hero-body'>
                    <div className="hero-title">
                        <h1 className='title has-text-centered'>Saved Articles</h1>
                        {(SavedArticles.length === 0 && SavedArticles !== undefined) ? <p className='subtitle has-text-centered'>{error}</p>: null}
                        {SavedArticles.map((result: any, index: number) => {
                            return (
                                <div key={index}>
                                    <NewsCard
                                        article={result}
                                        srcPage={"saved"}
                                        index={index}
                                        buttonAction={removeArticle}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default Saved;
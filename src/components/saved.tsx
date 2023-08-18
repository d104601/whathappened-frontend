import {useState, useEffect} from "react";
import 'bulma/css/bulma.css'
import NewsCard from "./newsCard";

function getSavedArticle() {
    let articles = localStorage.getItem("articles");
    if (articles === null) {
        return [];
    }
    return JSON.parse(articles);
}

const Saved = () => {
    // set saved articles to be an empty array of any type
    const [SavedArticles, setSavedArticles] = useState<any[]>([]);

    // When component is loaded or saved articles changes, update the saved articles
    useEffect(() => {

        setSavedArticles(getSavedArticle());
    }, []);

    const removeArticle = (article: any) => {
        let newArticles = SavedArticles.filter((a) => a !== article);

        localStorage.setItem("articles", JSON.stringify(newArticles));
        setSavedArticles(newArticles);
    }

    return (
        <div>
            <section className='section'>
                <h1 className='title has-text-centered'>Saved Articles</h1>

                {SavedArticles.length === 0 && <p className='subtitle has-text-centered'>No saved articles now.</p>}
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
            </section>
        </div>
    );
};

export default Saved;
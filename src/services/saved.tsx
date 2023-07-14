import {useState, useEffect} from "react";
import 'bulma/css/bulma.css'

function getSavedArticle() {
    let articles = localStorage.getItem("articles");
    if (articles === null) {
        return [];
    }
    return JSON.parse(articles);
}

function cuttingDate(date: string) {
    return date.substring(0, 10);
}


const Saved = () => {
    // set saved articles to be an empty array of any type
    const [SavedArticles, setSavedArticles] = useState<any[]>([]);

    // When component is loaded or saved articles changes, update the saved articles
    useEffect(() => {
        setSavedArticles(getSavedArticle());
    }, []);

    function removeArticle(article: any) {
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
                        <div className='card m-3' key={index}>
                            <div className='card-content'>
                                <div className='media'>
                                    <div className='media-content'>
                                        <p className='title is-4'><a href={result.url} target={"_blank"} rel="noreferrer">{result.name}</a></p>
                                        <p className='subtitle is-6'>{result.provider[0].name} {cuttingDate(result.datePublished)} {result.category}</p>
                                    </div>
                                </div>
                                <div className='content'>
                                    <p>{result.description}....</p>
                                </div>
                                <button className='button is-danger is-light' onClick={() => removeArticle(result)}>Remove
                                </button>
                            </div>

                        </div>
                    )
                })}
            </section>
        </div>
    );
};

export default Saved;
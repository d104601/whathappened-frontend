import {useState, useEffect} from "react";
import {Button, Card, Container, Link, Typography} from "@mui/material";

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

function removeArticle(article: any) {

}

const Saved = () => {
    // set saved articles to be an empty array of any type
    const [SavedArticles, setSavedArticles] = useState<any[]>([]);

    // When saved articles changes, update the saved articles
    useEffect(() => {
        setSavedArticles(getSavedArticle());
    }, []);

    return (
        <div>
            {SavedArticles.length === 0 && <Typography sx={{m: 2}}>No saved articles</Typography>}
            {SavedArticles.map((result: any, index: number) => {
                return (
                    <Card sx={{m: 2}} variant={"outlined"} key={index}>
                        <Typography sx={{m: 2}}>
                            <Link href={result.url}>{result.name}</Link><br/>
                            {result.provider[0].name} {cuttingDate(result.datePublished)} {result.category}
                        </Typography>
                        <Typography sx={{m: 2}}>{result.description}....</Typography>
                        <Button sx={{m: 2}} variant ={"contained"} onClick={() => removeArticle(result)}>Save this article</Button>
                    </Card>
                )
            })}
        </div>
    );
};

export default Saved;
import {useState, useEffect} from "react";
import {Button, Card, Link, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
            {SavedArticles.length === 0 && <Typography sx={{m: 2}}>No saved articles</Typography>}
            {SavedArticles.map((result: any, index: number) => {
                return (
                    <Card sx={{m: 2}} variant={"outlined"} key={index}>
                        <Typography sx={{m: 2}}>
                            <Link href={result.url}>{result.name}</Link><br/>
                            {result.provider[0].name} {cuttingDate(result.datePublished)} {result.category}
                        </Typography>
                        <Typography sx={{m: 2}}>{result.description}....</Typography>
                        <Button sx={{m: 2}} variant ={"outlined"} color={"error"} startIcon={<DeleteIcon />} onClick={() => removeArticle(result)}>Remove</Button>
                    </Card>
                )
            })}
        </div>
    );
};

export default Saved;
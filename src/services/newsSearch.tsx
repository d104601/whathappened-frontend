import {useState, FormEvent} from 'react';
import axios from 'axios';
import {TextField, Button, Card, Link, Typography} from "@mui/material";

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
                <TextField
                    placeholder={"Enter keyword here"}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    variant={"outlined"}
                    size={"small"}
                />
                <Button
                    type={"submit"}
                    variant={"contained"}
                    color={"primary"}
                >
                    Search
                </Button>
            </form>


            <div>
                {SearchResults.map((result: any, index: number) => {
                    return (
                        <Card sx={{m: 2}} variant={"outlined"} key={index}>
                            <Typography sx={{m: 2}}>
                                <Link href={result.url}>{result.name}</Link><br/>
                                {result.provider[0].name} {cuttingDate(result.datePublished)} {result.category}
                            </Typography>
                            <Typography sx={{m: 2}}>{result.description}....</Typography>
                            <Button sx={{m: 2}} variant ={"contained"} onClick={() => saveArticle(result)}>Save this article</Button>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

export default NewsSearch;
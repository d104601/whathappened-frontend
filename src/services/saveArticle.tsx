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

export default saveArticle;
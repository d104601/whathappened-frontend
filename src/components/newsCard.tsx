import {useState} from "react";
interface propData {
    article: {
        name: string;
        url: string;
        image: any;
        description: string;
        datePublished: string;
        provider: {
            name: string;
        }[];
        category: string;
    };
    srcPage: string;
    index: number;
    buttonAction: (object: {}) => void;
}

function cuttingDate(date: string) {
    return date.substring(0, 10);
}

function modalTrigger(index: number) {
    let modal = document.getElementById('remove-article-' + index);
    if (modal !== null) {
        modal.classList.add('is-active');
    }
}

function closeModal(index: number) {
    let modal = document.getElementById('remove-article-' + index);
    if (modal !== null) {
        modal.classList.remove('is-active');
    }
}


const NewsCard = (props: propData) => {
    const {article, srcPage, index, buttonAction} = props;
    const [buttonText, setButtonText] = useState("Save this article");
    const [buttonClass, setButtonClass] = useState("button is-link" as any);
    const [disabled, setDisabled] = useState(false);

    const actionWithArticle = async () => {
        if(buttonText === "Save this article") {
            setButtonClass("button is-loading");
        }
        const response = await buttonAction(article);
        console.log(response);
        // @ts-ignore
        if(response === "success") {
            setButtonText("Saved");
            setButtonClass("button is-success");
        }
        // @ts-ignore
        else if(response === "already saved") {
            setButtonText("Already saved");
            setButtonClass("button is-warning disabled");
        }
        // @ts-ignore
        else if(response === "error") {
            setButtonText("Error");
            setButtonClass("button is-danger disabled");
        }
        setDisabled(true);
    }

    return (
        <div className="card m-3" key={index}>
            <div className='card-content'>
                <div className='media'>
                    <div className='media-left'>
                        {
                            (article.image !== null && article.image !== undefined)
                            &&
                            <figure className='image is-128x128'>
                                <img src={article.image.thumbnail.contentUrl} alt={article.name}/>
                            </figure>
                        }
                    </div>
                    <div className='media-content'>
                        <p className='title is-4'><a href={article.url} target={"_blank"}
                                                     rel="noreferrer">{article.name}</a></p>
                        <p className='subtitle is-6'>{article.provider[0].name} {cuttingDate(article.datePublished)} {article.category}</p>
                        <p>{article.description}....</p>
                    </div>
                    <div className='media-right'>
                        {srcPage === "search"
                            &&
                            <button
                                className={buttonClass}
                                onClick={actionWithArticle}
                                disabled={disabled}
                            >
                                {buttonText}
                            </button>}
                        {srcPage === "saved"
                            &&
                            <button className='button is-danger' onClick={() => modalTrigger(index)}>
                                Remove
                            </button>
                        }
                    </div>
                </div>

            </div>

            {srcPage === "saved"
                &&
                <div className='modal' id={'remove-article-' + index}>
                    <div className='modal-background' onClick={() => closeModal(index)}></div>
                    <div className='modal-content'>
                        <div className='box has-text-centered'>
                            <p className="m-3">Are you sure to remove this article?</p>
                            <button className='button is-danger m-2 is-normal' onClick={() => {
                                actionWithArticle();
                                closeModal(index);
                            }}
                            >
                                Yes
                            </button>
                            <button className='button m-2' onClick={() => closeModal(index)}> No</button>
                        </div>
                    </div>
                    <button className='modal-close m-2' aria-label='close'
                            onClick={() => closeModal(index)}></button>
                </div>
            }
        </div>

    )
}

export default NewsCard;
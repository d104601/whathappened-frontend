import {useState, FormEvent, useEffect} from 'react';
import axios from 'axios';

import NewsCard from './newsCard';
import PaginationBar from './paginationBar';
import {NewsService} from "../services/newsService";

const NewsSearch = () => {
    const [SearchTerm, setSearchTerm] = useState("");
    const [SearchOption, setSearchOption] = useState(0);
    const [SearchLocation, setSearchLocation] = useState("");
    const [SearchLanguage, setSearchLanguage] = useState("en-US");
    const [SearchPeriod, setSearchPeriod] = useState("");

    const [SavedSearchOptions, setSavedSearchOptions] = useState({} as any);

    const [SearchResults, setSearchResults] = useState([]);
    const [CurrentOffset, setCurrentOffset] = useState(0);
    const [TotalMatches, setTotalMatches] = useState(0);

    useEffect(() => {
        const changePage = async () => {
            let params = SavedSearchOptions;
            params["offset"] = CurrentOffset;
            setSavedSearchOptions(params);
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/search", {
                params: params,
            }).then((response) => {
                return response;
            });
            setTotalMatches(response.data.totalEstimatedMatches);
            setSearchResults(response.data.value);
        }

        if (SavedSearchOptions.q !== undefined) {
            changePage();
        }
    }, [CurrentOffset]);

    const search = async (e: FormEvent) => {
        e.preventDefault();
        setSearchResults([]);
        setCurrentOffset(0);

        let params: any = {
            q: encodeURIComponent(SearchTerm),
            offset: CurrentOffset,
        }
        if (SearchOption === 1) {
            if (SearchLanguage !== "") {
                params["language"] = SearchLanguage;
            }

            if (SearchLocation !== "") {
                params["location"] = SearchLocation;
            }

            if (SearchPeriod !== "") {
                params["freshness"] = SearchPeriod;
            }
        }

        setSavedSearchOptions(params);

        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/search", {
            params: params,
        }).then((response) => {
            return response;
        }).catch((error) => {
            // print all parameters
            console.log(error.config);
        });

        setTotalMatches(response?.data.totalEstimatedMatches);
        setSearchResults(response?.data.value);
        console.log(SavedSearchOptions);
        console.log(TotalMatches);
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
                        <button className='button is-small' onClick={() => setSearchOption(1)}>See more search
                            option</button>
                    }
                    {
                        SearchOption === 1 &&
                        <>
                            <button className='button is-small' onClick={() => setSearchOption(0)}>Hide search option
                            </button>
                            <div className="columns mt-1 is-1">
                                <div className="column">
                                    <div className="control">
                                        Location:
                                        <div className='select is-small'>
                                            <select onChange={(e) => {
                                                setSearchLocation(e.target.value)
                                            }}>
                                                <option value="">All</option>
                                                <option value="en-US">United States</option>
                                                <option value="en-CA">Canada</option>
                                                <option value="en-GB">United Kingdom</option>
                                                <option value="en-AU">Australia</option>
                                                <option value="zh-CN">China</option>
                                                <option value="en-IN">India</option>
                                                <option value="ja-JP">Japan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className='control'>
                                        Language:
                                        <div className='select is-small'>
                                            <select onChange={(e) => {
                                                setSearchLanguage(e.target.value)
                                            }}>
                                                <option value="">Default</option>
                                                <option value="en">English</option>
                                                <option value="zh">Chinese</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                                <option value="it">Italian</option>
                                                <option value="ja">Japanese</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="control">
                                        Posted within:
                                        <div className='select is-small'>
                                            <select onChange={(e) => {
                                                setSearchPeriod(e.target.value)
                                            }}>
                                                <option value="">All</option>
                                                <option value="Day">today</option>
                                                <option value="Week">past week</option>
                                                <option value="Month">past month</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </form>
            </section>

            <section className='container'>
                {
                    SearchResults.length !== 0 &&
                    // pagination
                    <PaginationBar
                        CurrentOffset={CurrentOffset}
                        setCurrentOffset={setCurrentOffset}
                        TotalResults={TotalMatches}
                    />
                }
                {
                    SearchResults.map((result: any, index: number) => {
                        return (
                            <div key={index}>
                                <NewsCard
                                    article={result}
                                    srcPage="search"
                                    index={index}
                                    buttonAction={NewsService.saveArticle}
                                />
                            </div>
                        )
                    })}
                {
                    SearchResults.length !== 0
                    &&
                    <PaginationBar
                        CurrentOffset={CurrentOffset}
                        setCurrentOffset={setCurrentOffset}
                        TotalResults={TotalMatches}
                    />
                }
            </section>
        </div>
    );
}

export default NewsSearch;
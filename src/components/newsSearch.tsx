import {useState, FormEvent, useEffect} from 'react';
import axios from 'axios';

import NewsCard from './newsCard';
import PaginationBar from './paginationBar';
import saveArticle from '../services/saveArticle';

interface SavedSearchParam {
    searchTerm: string,
    searchLocation: string,
    searchLanguage: string,
    searchPeriod: string
}

const NewsSearch = () => {
    const [SearchTerm, setSearchTerm] = useState("");
    const [SearchOption, setSearchOption] = useState(0);
    const [SearchLocation, setSearchLocation] = useState("");
    const [SearchLanguage, setSearchLanguage] = useState("en-US");
    const [SearchPeriod, setSearchPeriod] = useState("");

    const [SavedSearchOptions, setSavedSearchOptions] = useState<SavedSearchParam>({} as SavedSearchParam);

    const [SearchResults, setSearchResults] = useState([]);
    const [CurrentOffset, setCurrentOffset] = useState(0);
    const [TotalMatches, setTotalMatches] = useState(0);

    useEffect(() => {
        console.log(SavedSearchOptions)
        const changePage = async() => {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/search", {
                params: {
                    q: encodeURIComponent(SavedSearchOptions.searchTerm),
                    location: SavedSearchOptions.searchLocation,
                    language: SavedSearchOptions.searchLanguage,
                    offset: CurrentOffset,
                    freshness: SavedSearchOptions.searchPeriod
                },
            }).then((response) => {
                return response;
            });
            setTotalMatches(response.data.totalEstimatedMatches);
            setSearchResults(response.data.value);
        }

        if(SavedSearchOptions.searchTerm !== undefined) {
            changePage();
        }
    }, [CurrentOffset, SavedSearchOptions.searchLanguage, SavedSearchOptions.searchLocation, SavedSearchOptions.searchPeriod, SavedSearchOptions.searchTerm]);

    const search = async (e: FormEvent) => {
        e.preventDefault();
        setSearchResults([]);
        setCurrentOffset(0);

        console.log(SearchLanguage);

        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/news/search", {
            params: {
                q: encodeURIComponent(SearchTerm),
                location: SearchLocation,
                language: SearchLanguage,
                offset: CurrentOffset,
                freshness: SearchPeriod
            },
        }).then((response) => {
            let searchOptions: SavedSearchParam = {} as SavedSearchParam;

            searchOptions.searchTerm = SearchTerm;

            // if user didn't select any language but select location, set language to language of location
            // So if location is not China or Japan, set language to English
            if(SearchLanguage === "" && SearchLocation !== "") {
                if(SearchLocation !== "zh-CN" && SearchLocation !== "ja-JP") {
                    searchOptions.searchLanguage = "en-US";
                } else {
                    searchOptions.searchLanguage = SearchLocation;
                }
            }

            if(SearchOption === 1) {
                searchOptions.searchLocation = SearchLocation;
                searchOptions.searchPeriod = SearchPeriod;
            }
            else {
                searchOptions.searchLocation = "";
                searchOptions.searchPeriod = "";
            }
            setSavedSearchOptions(searchOptions);
            return response;
        }).catch((error) => {
            // print all parameters
            console.log(error.config);
        });

        console.log(response);
        setTotalMatches(response?.data.totalEstimatedMatches);
        setSearchResults(response?.data.value);
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
                            <button className='button is-small' onClick={()=> setSearchOption(1)}>See more search option</button>
                    }
                    {
                        SearchOption === 1 && 
                        <>
                            <button className='button is-small' onClick={()=> setSearchOption(0)}>Hide search option</button>
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
                {SearchResults.length !== 0
                    &&
                    // pagination
                    <PaginationBar 
                        CurrentOffset={CurrentOffset}
                        setCurrentOffset={setCurrentOffset}
                        TotalResults={TotalMatches}
                    />
                }
                {SearchResults.map((result: any, index: number) => {
                    return (
                        <div key={index}>
                            <NewsCard
                                article={result}
                                srcPage="search"
                                index={index}
                                buttonAction={saveArticle}
                            />
                        </div>
                    )
                })}
                {SearchResults.length !== 0
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
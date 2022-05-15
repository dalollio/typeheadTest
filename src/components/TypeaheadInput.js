import SuggestionsList from "./SuggestionsList";
import React, { useState, useEffect } from 'react';

// This endpoint is from TheMovieDB https://developers.themoviedb.org/3/search/search-movies
// There is a missing query string `query` to make the search
const MOVIES_ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f";

export default function TypeaheadInput() {

  const [results, setResults] = useState([]);
  const [searchs, setCacheSearchs] = useState([]);
  let filterTimeout;

  const blur = () => {
    setResults([]);
  }

  const focus = (e) => {
    if (e?.target?.value) {
      getApiData(e.target.value);
    }
  }

  const getApiData = (query) => {
    const url = `${MOVIES_ENDPOINT}&query=${encodeURI(query)}`;
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data?.results.length > 0) {
            setSearchs(query);
          }
          setResults(data.results)
        }
        );
    } catch (error) {
      console.log("ERRO:", error)
    }
  }

  const getSearchs = () => {
    let data = localStorage.getItem('searchs');
    let queries;
    try {
      let temp = JSON.parse(data);
      if (Array.isArray(temp)) {
        queries = temp;
      } else {
        queries = [];
      }
    } catch {
      queries = [];
    }
    return queries;
  }

  const setSearchs = (query) => {
    let queries = getSearchs();
    queries.push(query);
    queries = [...new Set(queries)]
    setCacheSearchs(queries);
    localStorage.setItem('searchs', JSON.stringify(queries));
  }

  const debounceSearch = (e) => {
    clearTimeout(filterTimeout)
    if (!e?.target?.value) return setResults([])
    setResults([{ id: 0, title: '...' }])

    filterTimeout = setTimeout(() => {
      getApiData(e.target.value);
    }, 250)
  }

  useEffect(() => {
    setCacheSearchs(getSearchs());

  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="text-lg text-primary border-primary border rounded-md w-48 focus:w-96 transition-all focus:outline-none p-1 mb-2"
        placeholder="Search"
        onBlur={blur}
        onChange={debounceSearch}
        onFocus={focus}
        type="text"
      />
      {results.length > 0 && <SuggestionsList suggestions={results} />}

      {/* SHOW HISTORY SEARCHS */}
      <div>
        <ul className="flex flex-wrap">
          {searchs.map((search, i) => (
            <li key={search} className="p-1">
              <span>{search}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

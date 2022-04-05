import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { useGetCoinList } from "./hooks/useGetCoinList";
import Cards from "./components/Cards/Cards";
import Charts from "./components/Charts/Charts";
import SearchField from "./components/SearchField/searchField.jsx";

export const BtcContext = createContext({});

function App() {
  const queryString = require("query-string");

  const history = useHistory();

  const { getCoinList, loading } = useGetCoinList();

  const btcCoinsJson = localStorage.getItem("btc");

  const coinsLocalStorage = JSON.parse(btcCoinsJson);

  const [coins, setCoins] = useState(coinsLocalStorage || []);

  const parsed = queryString.parse(history.location.search);

  const [filterValue, setFilterValue] = useState(parsed.filter);

  const handleChangeFilterInput = ({ target }) => {
    setFilterValue(target.value);
  };

  useEffect(() => {
    localStorage.setItem("btc", JSON.stringify(coins));
  }, [coins]);

  useEffect(() => {
    getCoinList();
  }, []);

  const jsonKey = localStorage.getItem("coinList");

  const keyList = JSON.parse(jsonKey);

  const getName = (name) => {
    const newItem = keyList.find((item) => item === name);
    setCoins((prevState) => [...prevState, newItem]);
  };

  const deleteCoins = (deleteCoin) => {
    const newCoins = coins.filter((item) => item !== deleteCoin);
    setCoins(newCoins);
    localStorage.setItem("btc", JSON.stringify(newCoins));
  };

  return (
    <BtcContext.Provider
      value={{ coins, deleteCoins, filterValue, getName, keyList }}
    >
      {!loading ? (
        <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
          <div className="container">
            <SearchField />
            <hr className="w-full border-t border-gray-600 my-4" />
            <label>
              Фильтр
              <input
                onChange={handleChangeFilterInput}
                value={filterValue}
                className="filter"
                type="text"
              />
            </label>
            <hr className="w-full border-t border-gray-600 my-4" />
            <Cards />
            <hr className="w-full border-t border-gray-600 my-4" />
            <Charts />
          </div>
        </div>
      ) : (
        <div className="loading__wrapper">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            ></circle>
          </svg>
        </div>
      )}
    </BtcContext.Provider>
  );
}

export default App;

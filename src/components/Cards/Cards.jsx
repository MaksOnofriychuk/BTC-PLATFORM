import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BtcContext } from "../../App";
import { useGetPrice } from "../../hooks/useGetPrice";
import "./cards.scss";

const Cards = () => {
  const { coins, deleteCoins, filterValue } = useContext(BtcContext);
  const history = useHistory();

  const [selected, setSelected] = useState(null);

  const { getPrice, btc, setBtc } = useGetPrice(coins);

  useEffect(() => {
    if (coins.length > 0) {
      getPrice();
    }
  }, [coins]);

  const addFocus = (index) => {
    setSelected(index);
  };

  const handleDelete = (deleteName) => {
    deleteCoins(deleteName);
    const newBtc = btc.filter((item) => item.name !== deleteName);
    setBtc(newBtc);
  };

  const filtersCoins = btc.filter((item) =>
    item.name.includes(filterValue.toUpperCase())
  );

  useEffect(() => {
    history.push({
      pathname: "/coins",
      search: `?filter=${filterValue}`,
    });
  }, [filtersCoins]);

  const coinsFilter = filterValue !== "" ? filtersCoins : btc;

  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {coinsFilter &&
        coinsFilter.map((item, index) => {
          return (
            <div
              key={Math.random() + 1}
              className={`bg-white overflow-hidden shadow rounded-lg  border-purple-800 border-solid cursor-pointer ${
                selected === index ? "bg-4" : null
              } `}
              onClick={() => addFocus(index)}
            >
              <div className="px-4 py-5 sm:p-6 text-center">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {item.name} - USD
                </dt>
                <dd
                  key={Math.random() + 1}
                  className="mt-1 text-3xl font-semibold text-gray-900"
                >
                  {item.price}
                </dd>
              </div>
              <div className="w-full border-t border-gray-200"></div>
              <button
                onClick={() => handleDelete(item.name)}
                className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
              >
                Удалить
              </button>
            </div>
          );
        })}
    </dl>
  );
};

export default Cards;

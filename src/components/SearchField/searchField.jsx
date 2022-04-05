import React, { useState, useContext } from "react";
import { BtcContext } from "../../App";
import "./searchField.scss";

const SearchField = () => {
  const { getName, coins, keyList } = useContext(BtcContext);
  const [inputValue, setInputValue] = useState("");

  const [error, setError] = useState(false);

  const handleChangeInout = ({ target }) => {
    setInputValue(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coins.find((item) => item.toUpperCase() === inputValue.toUpperCase())) {
      setError(true);
      setInputValue("");
      return;
    } else {
      getName(inputValue.toUpperCase());
      setInputValue("");
      setError(false);
    }
  };

  const hints =
    keyList &&
    keyList
      .filter((item) => item.includes(inputValue.toUpperCase()))
      .slice(0, 4);

  return (
    <section>
      <div className="flex">
        <div className="max-w-xs">
          <label
            htmlFor="wallet"
            className="block text-sm font-medium text-gray-700"
          >
            Тикер
          </label>
          <div className="mt-1 relative rounded-md shadow-md">
            <form onSubmit={handleSubmit}>
              <input
                value={inputValue}
                onChange={handleChangeInout}
                autoComplete="off"
                name="wallet"
                id="wallet"
                className="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например DOGE"
              />
              {inputValue !== ""
                ? hints.map((item) => {
                    return (
                      <button
                        type="submit"
                        key={Math.random() + 1}
                        onClick={() => setInputValue(item)}
                        className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
                      >
                        {item}
                      </button>
                    );
                  })
                : null}
              <button
                type="submit"
                className="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Добавить
              </button>
            </form>
          </div>
          {error ? (
            <div className="text-sm text-red-600">Такой тикер уже добавлен</div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default SearchField;

import axios from "axios";
import { useState } from "react";

export const useGetPrice = (coins) => {
  const [btc, setBtc] = useState([]);

  const strCoins = coins && coins.join(",");

  const getPrice = async () => {
    try {
      await axios
        .get(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${strCoins}&tsyms=USD,EUR`
        )
        .then((resp) => {
          const a = Object.entries(resp.data);
          const b = a.map((item) => {
            return { name: item[0], price: item[1].USD };
          });
          setBtc(b);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return { getPrice, btc, setBtc };
};

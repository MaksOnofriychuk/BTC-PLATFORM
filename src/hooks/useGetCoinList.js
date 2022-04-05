import axios from "axios";
import { useState } from "react";

export const useGetCoinList = () => {
  const [loading, setLoading] = useState(true);

  const getCoinList = async () => {
    setLoading(true);
    const API_KEY =
      "b518deb4a1e2dd1c9107d603453ad6cc3dc4cbb5cfdbfbd2d00baf5634e1411e";
    try {
      await axios
        .get(
          `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${API_KEY}`
        )
        .then((resp) => {
          setTimeout(() => {
            const listKey = Object.keys(resp.data.Data);
            localStorage.setItem("coinList", JSON.stringify(listKey));
            setLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return { getCoinList, loading };
};

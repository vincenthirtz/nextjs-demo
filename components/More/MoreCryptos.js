import { useEffect, useState } from "react";

export default function MoreCryptos() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <div class="flex flex-col mt-6">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full text-sm text-gray-400">
                <thead class="bg-gray-800 text-xs uppercase font-medium">
                  <tr>
                    <th></th>
                    <th scope="col" class="px-6 py-3 text-left tracking-wider">
                      Crypto
                    </th>
                    <th scope="col" class="px-6 py-3 text-left tracking-wider">
                      price change % 24h
                    </th>
                    <th scope="col" class="px-6 py-3 text-left tracking-wider">
                      total volume
                    </th>
                    <th scope="col" class="px-6 py-3 text-left tracking-wider">
                      current price
                    </th>
                    <th scope="col" class="px-6 py-3 text-left tracking-wider">
                      market cap
                    </th>
                  
                  </tr>
                </thead>
                <tbody class="bg-gray-800">
                  {coins.map((coin) => (
                    <tr class="bg-black bg-opacity-20">
                      <td class="pl-4">{coin.id} </td>
                      <td class="flex px-6 py-4 whitespace-nowrap">
                        <img class="w-5" src={coin.image} alt="" />
                        <span class="ml-2 font-medium">
                          {coin.name} ({coin.symbol})
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {coin.price_change_percentage_24h < 0 ? (
                          <p className="coin-percent red">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        ) : (
                          <p className="coin-percent green">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        )}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {coin.total_volume}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {coin.current_price}{" "}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {coin.market_cap}
                      </td>
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

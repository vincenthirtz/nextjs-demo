import { useState, useEffect } from "react";
import Link from "next/link";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { useTheme } from "next-themes";

export default function Intro({ dataSlack, dataUserSlack }) {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState();
  const [status, setStatus] = useState();
  const [coins, setCoins] = useState([]);

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme) {
      setChecked(theme === "light" ? false : true);
    } else {
      setChecked(false);
    }
  }, [theme]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes("bitcoin")
  );
  const firstCoin = filteredCoins[0];

  useEffect(() => {
    if (dataSlack?.presence === "active") {
      setStatus("En ligne");
    } else {
      setStatus("Hors ligne");
    }
  }, [dataSlack?.presence]);

  return (
    <section className="flex-col md:flex-row flex items-baseline mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 ">
        <Link href="/">
          <a className="no-underline hover:underline">Vincent Hirtz</a>
        </Link>
      </h1>
      <div>
        <div className="tooltip">
          {dataSlack?.online ? (
            <span>
              <ion-icon name="radio-button-on-outline"></ion-icon>{" "}
              <span className="tooltiptext">
                {status} {dataUserSlack?.status_text}
              </span>
            </span>
          ) : (
            <ion-icon name="radio-button-off-outline"></ion-icon>
          )}{" "}
          sur{" "}
          <a href="https://join.slack.com/t/studio-vh/shared_invite/zt-tv03kr6r-rc7KmjZ56dYi~OrRJQcpcw">
            Slack
          </a>
        </div>
        <div className="tooltip" style={{ padding: "0 20px" }}>
          <ion-icon name="stats-chart-outline"></ion-icon>
          <span className="coin-symbol">{firstCoin?.symbol} </span>
          <span className="tooltiptext">
            <span className="coin-price">${firstCoin?.current_price}</span>
            {firstCoin?.price_change_24h < 0 ? (
              <span className="coin-percent red">
                <ion-icon name="trending-down-outline"></ion-icon>{" "}
                {firstCoin?.price_change_24h?.toFixed(2)}%
              </span>
            ) : (
              <span className="coin-percent green">
                <ion-icon name="trending-up-outline"></ion-icon>{" "}
                {firstCoin?.price_change_24h?.toFixed(2)}%
              </span>
            )}
          </span>
        </div>
      </div>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <div style={{ display: "flex", alignItems: "center" }}>
          <WbSunnyIcon />
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <Brightness3Icon />
        </div>
      </h4>
    </section>
  );
}

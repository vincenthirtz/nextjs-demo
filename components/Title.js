import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { useTheme } from "next-themes";
import Link from "next/link";
import Playing from "@/components/Playing";

export default function Title() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState();
  const [status, setStatus] = useState();
  const [coins, setCoins] = useState([]);
  const [dataSlack, setDataSlack] = useState();
  const [dataUserSlack, setDataUserSlack] = useState();

  useEffect(() => {
    const profileinfo = () => {
      let messageArgs = {
        token: process.env.NEXT_EXAMPLE_SLACK_TOKEN,
        user: process.env.NEXT_EXAMPLE_SLACK_USER,
      };
      postInfo(messageArgs);
    };

    const postInfo = async (args) => {
      const result = await axios.post(
        process.env.NEXT_EXAMPLE_SLACK_PROFILE_ENDPOINT,
        qs.stringify(args)
      );
      try {
        if (result.data) {
          setDataSlack(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    profileinfo();
  }, []);

  useEffect(() => {
    const profileuserinfo = () => {
      let messageArgs = {
        token: process.env.NEXT_EXAMPLE_SLACK_TOKEN,
        user: process.env.NEXT_EXAMPLE_SLACK_USER,
      };
      postUser(messageArgs);
    };

    const postUser = async (args) => {
      const result = await axios.post(
        process.env.NEXT_EXAMPLE_SLACK_INFO_ENDPOINT,
        qs.stringify(args)
      );
      try {
        if (result.data) {
          setDataUserSlack(result.data.user.profile);
        }
      } catch (e) {
        console.log(e);
      }
    };
    profileuserinfo();
  }, []);

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
    <section className="title-master">
      <div className="group-title">
        <h1>
          <span>Vincent Hirtz</span>
          <span>Vincent Hirtz</span>
        </h1>
        <h2>Blog</h2>
      </div>

      <Playing style={{ margin: "0 2rem" }} />

      <div style={{ margin: "0 2rem" }}>
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
          <a
            href="https://join.slack.com/t/studio-vh/shared_invite/zt-tv03kr6r-rc7KmjZ56dYi~OrRJQcpcw"
            target={"_blank"}
          >
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
    </section>
  );
}

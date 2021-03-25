import { useEffect, useState } from 'react';
import Head from "next/head";
import Intro from "@/components/Intro";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Coin from "@/components/Coin/Coin";
import TextField from '@material-ui/core/TextField';


export default function Coins() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => res.json())
            .then(data => {
                setCoins(data);
            }).catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <>
            <Layout>
                <Head>
                    <title>Coins - Vincent Hirtz</title>
                    <meta name="author" content={"Vincent Hirtz"} />
                    <meta name="description" content={""}></meta>
                </Head>
                <Container>
                    <Intro />
                    <>
                        <form className="coin-container">
                            <TextField fullWidth id="standard-basic" className="coin-input" label="Rechercher" onChange={handleChange} />
                        </form>
                        {filteredCoins.length > 0 && filteredCoins.map(coin => {
                            return (
                                <Coin key={coin.id} name={coin.name} image={coin.image}
                                    symbol={coin.symbol} marketcap={coin.market_cap}
                                    price={coin.current_price}
                                    priceChange={coin.price_change_percentage_24h}
                                    volume={coin.total_volume} />
                            )
                        })}
                        {filteredCoins.length === 0 && "Aucuns résultats"}
                    </>
                </Container>
            </Layout>
        </>
    );
}

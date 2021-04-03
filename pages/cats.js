import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Intro from "@/components/Intro";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Cat from "@/components/Cat/Cat";
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Cats() {
    const [cats, setCats] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [isLoading, setIsLoading] = useState(true);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/json");
    myHeaders.append("x-api-key", process.env.NEXT_EXAMPLE_CAT_API_KEY);
    var options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    useEffect(() => {
        if (search !== '') {
            fetch(`https://api.thecatapi.com/v1/breeds/search?q=${search}`
                , options)
                .then(res => res.json())
                .then(data => {
                    setCats(data);
                    setIsLoading(false)
                }).catch(err => console.log(err))
        } else {
            fetch(`https://api.thecatapi.com/v1/breeds?page=${page}&limit=${rowsPerPage}`
                , options)
                .then(res => res.json())
                .then(data => {
                    setCats(data);
                    setIsLoading(false)
                }).catch(err => console.log(err))
        }
    }, [search, page, rowsPerPage, isLoading])

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const getImage = idBreed => {
        if (idBreed) {
            return fetch(`https://api.thecatapi.com/v1/images/${idBreed}`
                , options)
                .then(res => res.json())
                .then(image => image.url)
                .catch(err => console.log(err))
        }
    }

    const filteredCats = React.useMemo(
        () =>
            cats.filter((cat) => {
                if (cat.reference_image_id && !cat?.image?.url && !cat.searchPhoto) {
                    getImage(cat.reference_image_id).then(response => {
                        cat.searchPhoto = response;
                    })
                }
                return cat.name.toLowerCase().includes(search.toLowerCase())
            }),
        [search, page, rowsPerPage, isLoading]
    );

    return (
        <>
            <Layout>
                <Head>
                    <title>cats - Vincent Hirtz</title>
                    <meta name="author" content={"Vincent Hirtz"} />
                    <meta name="description" content={""}></meta>
                </Head>
                <Container>
                    <Intro />
                    <>
                        <form className="coin-container">
                            <TextField fullWidth id="standard-basic" className="coin-input" label="Rechercher" onChange={handleChange} />
                        </form>
                        {isLoading && <LinearProgress />}
                        {!isLoading && filteredCats.length > 0 &&
                            <Cat filteredCats={filteredCats} 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage} 
                            rowsPerPage={rowsPerPage}
                            page={page}
                            />
                        }
                        {!isLoading && filteredCats.length === 0 && "Aucuns résultats"}
                    </>
                </Container>
            </Layout>
        </>
    );
}

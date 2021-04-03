import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Cat = ({ filteredCats, handleChangePage, handleChangeRowsPerPage, rowsPerPage, page }) => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        if (filteredCats && filteredCats.length > 0) {
            setCats(filteredCats)
        }
    }, [filteredCats])

    const classes = useStyles();

    return (
        <div className="coin-container">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Race</TableCell>
                            <TableCell align="right">adaptability</TableCell>
                            <TableCell align="right">affection_level</TableCell>
                            <TableCell align="right">child_friendly</TableCell>
                            <TableCell align="right">dog_friendly</TableCell>
                            <TableCell align="right">energy_level</TableCell>
                            <TableCell align="right">grooming</TableCell>
                            <TableCell align="right">hairless</TableCell>
                            <TableCell align="right">health_issues</TableCell>
                            <TableCell align="right">hypoallergenic</TableCell>
                            <TableCell align="right">indoor</TableCell>
                            <TableCell align="right">intelligence</TableCell>
                            <TableCell align="right">life_span</TableCell>
                            <TableCell align="right">natural</TableCell>
                            <TableCell align="right">shedding_level</TableCell>
                            <TableCell align="right">short_legs</TableCell>
                            <TableCell align="right">social_needs</TableCell>
                            <TableCell align="right">stranger_friendly</TableCell>
                            <TableCell align="right">suppressed_tail</TableCell>
                            <TableCell align="right">temperament</TableCell>
                            <TableCell align="right">vocalisation</TableCell>
                            <TableCell align="right">weight imperial</TableCell>
                            <TableCell align="right">weight metric</TableCell>
                            <TableCell align="right">wikipedia</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cats.map(data => {
                            return (<TableRow key={data.name}>
                                <TableCell component="th" scope="row" title={data.description}>
                                    {data.name}
                                    {data?.image?.url && <img src={data?.image?.url} alt="chat" title={data.description} />}
                                    {!data?.image?.url && data?.searchPhoto && <img src={data?.searchPhoto} alt="chat" title={data.description} />}
                                </TableCell>
                                <TableCell align="right">{data.adaptability}</TableCell>
                                <TableCell align="right">{data.affection_level}</TableCell>
                                <TableCell align="right">{data.child_friendly}</TableCell>
                                <TableCell align="right">{data.dog_friendly}</TableCell>
                                <TableCell align="right">{data.energy_level}</TableCell>
                                <TableCell align="right">{data.grooming}</TableCell>
                                <TableCell align="right">{data.hairless}</TableCell>
                                <TableCell align="right">{data.health_issues}</TableCell>
                                <TableCell align="right">{data.hypoallergenic}</TableCell>
                                <TableCell align="right">{data.indoor}</TableCell>
                                <TableCell align="right">{data.intelligence}</TableCell>
                                <TableCell align="right">{data.life_span}</TableCell>
                                <TableCell align="right">{data.natural}</TableCell>
                                <TableCell align="right">{data.shedding_level}</TableCell>
                                <TableCell align="right">{data.short_legs}</TableCell>
                                <TableCell align="right">{data.social_needs}</TableCell>
                                <TableCell align="right">{data.stranger_friendly}</TableCell>
                                <TableCell align="right">{data.suppressed_tail}</TableCell>
                                <TableCell align="right">{data.temperament}</TableCell>
                                <TableCell align="right">{data.vocalisation}</TableCell>
                                <TableCell align="right">{data?.weight?.imperial}</TableCell>
                                <TableCell align="right">{data?.weight?.metric}</TableCell>
                                <TableCell align="right"><a target="_blank" href={data.wikipedia_url}>Lien</a></TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={cats.length}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>

        </div>
    );
}

export default Cat;
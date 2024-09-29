'use client'
//Material UI imports
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Paper,
    Box,
    CircularProgress,
    Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DataArrayIcon from '@mui/icons-material/DataArray';

const TableComponent = ({ data, getData, loading, setLoading, page, setPage }) => {
    const handleScroll = (event) => {
        if (data.length === 0) return;
        const tableContainer = event.target;
        let scrollPosition = tableContainer.scrollTop + tableContainer.offsetHeight;
        const tableHeight = tableContainer.scrollHeight;

        if (scrollPosition >= tableHeight - .5) {
            setPage(page + 1);
            setLoading(true);
            getData('generate', { amount: 10, page: page + 1 });
        }
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.secondary.plus,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <>

            {loading && <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10px 0' }}>
                <CircularProgress color="secondary" />
            </Box>}

            <TableContainer component={Paper} onScroll={handleScroll} sx={loading && { overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Index</StyledTableCell>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Adress</StyledTableCell>
                            <StyledTableCell>Phone</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{row.id}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.address}</StyledTableCell>
                                <StyledTableCell>{row.phone}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

                { data.length === 0 && !loading && <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '10px 0', alignItems: 'center' }}>
                    <DataArrayIcon color="secondary" sx={{ fontSize: 40 }}/>
                    <Typography variant='body1' sx={{ textAlign: 'center' }}>Couldn't generate more data, please try again</Typography>
                </Box>}
            </TableContainer>
        </>

    )
}

export default TableComponent;
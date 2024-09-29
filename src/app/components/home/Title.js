'use client'

//Material UI imports
import DataObjectIcon from '@mui/icons-material/DataObject';
import { Box, Typography } from "@mui/material";

const Title = () => {

    return (
        <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
            <DataObjectIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant='h3' sx={{ fontWeight: "bold" }}>Data Faker</Typography>
            <Typography variant='subtitle1'>
                Scroll down to fecth more data. Change the options as you prefer.
            </Typography>
        </Box>
    )
}

export default Title;
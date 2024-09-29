'use client'
//React import
import { useState, useEffect } from 'react';

//Material UI imports
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    TextField,
    IconButton,
    Button
} from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';

//Library imports
import seedrandom from "seedrandom";

const OptionsInputs = ({ getData, setData, setLoading, setPage, loading, handleExportData }) => {
    const [region, setRegion] = useState(0);
    const [errors, setErrors] = useState(0);
    const [seed, setSeed] = useState(471961336);
    const [messageErrors, setMessageErrors] = useState(['', '']);

    const handleChangeSelect = (e) => {
        setRegion(e.target.value);
    }

    const handleChangeErrors = (e) => {
        setErrors(e.target.value);  
    }

    const handleChangeSlider = (e) => {
        setErrors(e.target.value);
    }

    const handleChangeSeed = (e) => {
        setSeed(cleanNumber(e.target.value));
    }

    const cleanNumber = (value) => {
        return value.replace(/\./g, '');
    }

    const handleRandomSeed = () => {
        const rng = seedrandom();
        setSeed(Math.abs(rng.int32()));
    }

    const getOptions = (type) => {
        let options = {};
        let amount = 20;
        if (type === 'initial') {
            options = {
                seed: parseInt(seed) + 1,
                region: parseInt(region),
                amount: amount,
                error: parseFloat(errors)
            }
        } else {
            amount = 10;
            options = {
                amount: amount
            }
        }
        return options;
    }

    const validateInputs = () => {
        let messages = ['', ''];
        if (errors === '') {
            messages[0] = 'You must enter an amount of errors';
        } else if (errors > 1000) {
            messages[0] = 'The maximum amount of errors is 1000';
        } else if (errors < 0) {
            messages[0] = 'You must enter a positive amount of errors';
        } else {
            messages[0] = '';
        }
        if (seed === '') {
            messages[1] = 'You must enter a seed';
        } else if (seed < 0) {
            messages[1] = 'You must enter a positive seed';
        }
        else {
            messages[1] = '';
        }
        setMessageErrors(messages);
        if (messages.every(message => message === ''))
            return true;
        else
            return false;
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            if (validateInputs()) {
                setData([]);
                setPage(1);
                setLoading(true);
                const options = getOptions('initial');
                getData('initial', options);
            }
          }, 500);

          return () => {
            clearTimeout(handler);
          };
    }, [region, errors, seed]);

    return (
        <Box sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
            minWidth: {
                xs: "300px",
                sm: "400px",
                md: "650px"
            },
            marginBottom: "40px",
            flexDirection: {
                xs: "column",
                sm: "column",
                md: "row"
            },
            gap: {
                xs: 2,
                sm: 2
            }
        }}>
            <FormControl size='small' sx={{ minWidth: 120 }}>
                <InputLabel id="region-label">Region</InputLabel>
                <Select
                    labelId="region-label"
                    id="region"
                    value={region}
                    label="Region"
                    onChange={handleChangeSelect}
                    disabled={loading} >

                    <MenuItem value={0}>Mexico</MenuItem>
                    <MenuItem value={1}>Italy</MenuItem>
                    <MenuItem value={2}>Germany</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                        error={messageErrors[0] !== ''}
                        id="errors"
                        label="Errors"
                        variant="outlined"
                        type="number"
                        size='small'
                        sx={{ minWidth: 160 }}
                        value={errors}
                        onChange={handleChangeErrors}
                        required
                        helperText={messageErrors[0]}
                        disabled={loading} />
                </FormControl>

                <Slider
                    value={errors}
                    onChange={handleChangeSlider}
                    step={1}
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    sx={{ width: 80 }}
                    color='secondary' />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                        error={messageErrors[1] !== ''}
                        id="seed"
                        label="Seed"
                        variant="outlined"
                        type="number"
                        size='small'
                        sx={{ minWidth: 160 }}
                        value={seed}
                        onChange={handleChangeSeed}
                        helperText={messageErrors[1]}
                        disabled={loading}/>
                </FormControl>

                <div>
                    <IconButton color='secondary' onClick={handleRandomSeed} disabled={loading}>
                        <ShuffleIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </Box>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleExportData}
                disabled={loading}
                sx={{ color: "white" }}>
                Export
            </Button>
        </Box>
    )
}

export default OptionsInputs;
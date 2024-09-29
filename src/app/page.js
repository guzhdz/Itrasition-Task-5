'use client'
//React import
import { useState } from 'react';

//Services import
import { generateData } from './services/dataService';

//Components imports
import OptionsInputs from "./components/home/OptionsInputs";
import Title from "./components/home/Title";
import Table from "./components/home/TableComponent";

//Material UI imports
import {
  createTheme,
  ThemeProvider,
  Container,
  Box
} from "@mui/material";

//Library imports
import { parse } from 'json2csv';
import { saveAs } from 'file-saver';


export default function Home() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#2c6dc0',
        main: '#265cad',
        dark: '#03246c',
        plus: '#bbdaf5',
        contrastText: '#fff',
      },
      secondary: {
        light: '#38a7eb',
        main: '#3499dc',
        dark: '#2f86c8',
        plus: '#e2f5fd',
        contrastText: '#000',
      },
    },
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getData = async (type, options) => {
    const response = await generateData(type, options);
    setTimeout(() => {
      if (response.ok) {
        if(type === 'initial') {
          setData(response.data);
        } else { 
          setData([...data, ...response.data]);
        }
      } else {
        alert(response.message);
      }
      setLoading(false);
    }, 2000);
  }

  const handleExportData = () => {
    console.log("entre");
    try {
      const dataFormat = data.map((item, index) => {
        return {
          'Index': index + 1,
          'ID': item.id, 
          'Name': item.name,
          'Email': item.email,
          'Phone': item.phone
        }
      })
      const csv = parse(dataFormat);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'exported_data.csv');
    } catch (err) {
      console.error('Error exporting to CSV:', err);
      alert('Error exporting to CSV, please try again later.');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px 0px"
        }}>

          <Title />
          <OptionsInputs 
          getData={getData}
          setData={setData}
          setLoading={setLoading}
          loading={loading}
          setPage={setPage}
          handleExportData={handleExportData} />
          <Table
            data={data}
            loading={loading}
            getData={getData} 
            setLoading={setLoading}
            page={page}
            setPage={setPage} />

        </Box>
      </Container>
    </ThemeProvider>
  );
}

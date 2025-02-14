import { Container, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi.ts';
import { IPage } from '../../types';
import Loader from '../../components/UI/Loader/Loader.tsx';

const initialState = {
  title: '',
  content: ''
}

const Page = () => {
 const {page} = useParams();
 const location = useLocation();
 const [pageContent, setPageContent] = useState<IPage>(initialState);
 const [loading, setLoading] = useState<boolean>(false)

 const fetchData = useCallback(async () => {
   setLoading(true);
   let URL = `pages/${page}.json`;
   if (location.pathname === '/') {
     URL = 'pages/home.json'
   }
   try {
     const response = await axiosApi(URL);
     console.log(response.data);
     setPageContent(response.data);
   } catch (e) {
     alert(e);
   } finally {
     setLoading(false);
   }
 }, [page, location])

  useEffect(() => {
    void fetchData();
  }, [fetchData]);


  return (
    loading ? <Loader/> :
    <>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {pageContent.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {pageContent.content}
        </Typography>
      </Container>
    </>
  );
};

export default Page;
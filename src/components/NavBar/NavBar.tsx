import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi.ts';
import { IPageName, IPagesApi } from '../../types';
import Loader from '../UI/Loader/Loader.tsx';

const NavBar = () => {
  const [pagesList, setPagesList] = useState<IPageName[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try{
    const response = await axiosApi<IPagesApi>('pages.json');
    if (response.data) {
      const pagesObject = response.data;
      const pagesObjectKeys = Object.keys(pagesObject);
      const quotesArr = pagesObjectKeys.map(key => {
        return {
          id: key
        };
      })
      setPagesList(quotesArr);
    } else {
      setPagesList([]);
    }
  } catch (e) {
    alert(e);
  } finally {
    setLoading(false);
  }
}, [])

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    loading ? <Loader /> :
    <Box sx={{mb: 5}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color='inherit'
            component={NavLink}
            to='/'
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Quotes Central
          </Typography>
          {pagesList.map(page => (
            <Button key={page.id} color='inherit' component={NavLink} to={`/pages/${page.id}`}>{page.id}</Button>
          ))}

          <Button color='inherit' component={NavLink} to='/pages/admin'>Admin</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
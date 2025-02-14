import { Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { IPage, IPageMutation, IPageName } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';

interface Props {
  onSubmitAction: (data: IPage) => void;
}

const initialState = {
  title: '',
  content: '',
  page: '',
}


const Admin: React.FC<Props> = ({onSubmitAction}) => {
  const [form, setForm] = useState<IPageMutation>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<IPageName[]>([])

  const fetchPageName = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi('pages.json')
      if (response.data) {
        const objectResponse = response.data
        const pagesObjectKeys = Object.keys(objectResponse);
        const pagesArr = pagesObjectKeys.map(key => {
          return {
            id: key
          };
        });
        setPages(pagesArr)
      } else {
        setPages([])
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPageName()
  }, [fetchPageName])

  const fetchData = useCallback( async (selectedPage: string) => {
    try {
      setLoading(true);
      const response = await axiosApi(`pages/${selectedPage}.json`)
      setForm(response.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAction({...form});
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const onSelectChange = (e: SelectChangeEvent<string>) => {
    const selectedPage = e.target.value;
    setForm((prevForm) => ({ ...prevForm, page: selectedPage }));
    void fetchData(selectedPage);
  };

  return (
    <>
      {loading ? <Loader/> :
      <form onSubmit={onSubmit}>
        <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center'}}>
          Edit</Typography>

        <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 4}}>
          <Grid size={12}>
            <Select
              name="page"
              value={form.page || ''}
              onChange={onSelectChange}
              required
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Page
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page.id} value={page.id}>
                  {page.id}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid size={12}>
            <Grid size={12}>
              <TextField sx={{width: '100%', my: 3} }
                         label="Title"
                         name="title"
                         variant="outlined"
                         value={form.title}
                         onChange={onInputChange}
                         required/>
            </Grid>
            <TextField sx={{width: '100%'}}
                       label="Content"
                       name="content"
                       variant="outlined"
                       value={form.content}
                       onChange={onInputChange}
                       required/>
          </Grid>
          <Grid size={12}>
            <Button sx={{width: '100%'}} type="submit" variant="contained">Edit</Button>
          </Grid>
        </Grid>
      </form>
      }
    </>
  );
};


export default Admin;
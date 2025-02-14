import { Route, Routes } from 'react-router-dom';
import Page from './containers/Page/Page.tsx';
import NavBar from './components/NavBar/NavBar.tsx';
import { Container } from '@mui/material';
import Admin from './containers/Admin/Admin.tsx';

const App = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Page/>} />
          <Route path="pages/:page" element={<Page/>} />
          <Route path="pages/admin" element={<Admin/>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
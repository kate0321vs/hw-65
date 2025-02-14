import { Container, Typography } from '@mui/material';

const Page = () => {



  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        <Typography variant="body1" color="textSecondary">
          I’m passionate about design and development, creating unique digital experiences.
          Explore my work and let’s build something great together!
        </Typography>
      </Container>
    </>
  );
};

export default Page;
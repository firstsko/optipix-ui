import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from '../components/AppAppBar.tsx';
import Annotation from '../components/Annotation.tsx';
import Footer from '../components/Footer.tsx';
import AppTheme from '../shared-theme/AppTheme.tsx';


export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Annotation />
      </Container>
      <Footer />
    </AppTheme>
  );
}
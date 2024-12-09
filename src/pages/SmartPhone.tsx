import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from '../components/AppAppBar';
import SmartPhoneContainer from '../components/SmartPhoneContainer';
import Footer from '../components/Footer';
import AppTheme from '../shared-theme/AppTheme';


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
        <SmartPhoneContainer />
      </Container>
      <Footer />
    </AppTheme>
  );
}
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import SmartPhoneDemo from "./SmartPhoneDemo";


const MobileFrame = styled(Box)(() => ({
  width: 375, 
  height: 767, 
  backgroundColor: "white",
  borderRadius: 36,
  border: "16px solid #333", 
  position: "relative",
  overflow: "hidden",
  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",  
  margin: "auto",
  paddingTop: "0px",  
  paddingBottom: "0",  
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const ScreenContent = () => {
  return (
    <Container maxWidth="sm">
      <MobileFrame>
        <Box sx={{ textAlign: "center", padding: 2 }}>
      <SmartPhoneDemo/>

        </Box>
      </MobileFrame>
    </Container>
  );
};

export default ScreenContent;

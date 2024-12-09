import { useState } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";

const ChatComponent = () => {
  // Sample chat data
  const [messages, setMessages] = useState([
    { sender: "Takei", message: "There is a scratch on the part in the diagram, is it acceptable?", time: "11:23 AM" },
    { sender: "Suzuki", message: "The scratch is minor and does not affect functionality. It’s acceptable.", time: "11:30 AM" },
    { sender: "Kawabata", message: "Thanks for confirming. I’ll continue with the assembly.", time: "11:35 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");


  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "John Doe", message: newMessage, time: "Just now" }]);
      setNewMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "35vh" }}>
      <Box sx={{ flexGrow: 1, padding: 2, display: "flex", flexDirection: "column", alignItems: "flex-start", overflowY: "hidden" }}>
        <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
          {messages.map((message, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "black", textAlign: "left" }}>
                {message.time} - {message.sender}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, color: "black", textAlign: "left" }}>
                {message.message}
              </Typography>
            </Box>
          ))}
        </Box>
        
      </Box>

      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
  <TextField
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    fullWidth
    placeholder="Type a message..."
    variant="outlined"
    sx={{
      marginRight: 2,
      backgroundColor: "white",  
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'white', 
        '& fieldset': {
          borderColor: 'gray',
        },
      },
    }}
  />
  <Button onClick={handleSendMessage} variant="contained">
    Send
  </Button>
</Box>
    </Box>
  );
};

export default ChatComponent;

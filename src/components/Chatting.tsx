import { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography, Divider, List, ListItem, ListItemText, Avatar } from "@mui/material";


const ChatComponent = ({ cardData }: { cardData: any }) => {
  const [messages, setMessages] = useState([
    { sender: "Takei", message: "There is a scratch on the part in the diagram, is it acceptable?", time: "11:23 AM" },
    { sender: "Taro", message: "Can we proceed with this part despite the scratch?", time: "11:25 AM" },
    { sender: "Suzuki", message: "The scratch is minor and does not affect functionality. It’s acceptable.", time: "11:30 AM" },
    { sender: "Kawabata", message: "Thanks for confirming. I’ll continue with the assembly.", time: "11:35 AM" },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  
  // Ref to scroll to the bottom of the chat
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // WebSocket connection reference
  const socketRef = useRef<WebSocket | null>(null);

  // Connect to the WebSocket server on component mount
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/ws/chat");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      console.log("Message from server: ", event.data);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        project_id: cardData.project_id,
        part_id: cardData.part_id,
        message: newMessage,
        sender: "John Doe", // This can be dynamically set depending on the logged-in user
        to: "Suzuki", // This could be set based on the recipient of the message
        timestamp: new Date().toISOString(), // Get the current timestamp
      };

      // Send the message to the WebSocket server
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(messageData));
        console.log("Sent message:", messageData);
      }

      // Update local state with the new message
      setMessages([
        ...messages,
        { sender: "John Doe", message: newMessage, time: "Just now" },
      ]);
      setNewMessage("");
    }
  };

  useEffect(() => {
  }, [messages]);

  return (
    <Box sx={{ display: "flex", height: "70vh", flexDirection: "row" }}>
      {/* Sidebar: Left Panel */}
      <Box
        sx={{
          width: 240,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 2,
        }}
      >
        <List sx={{ width: "100%", marginTop: 2 }}>
          <ListItem>
            <Avatar sx={{ marginRight: 2 }}>A</Avatar>
            <ListItemText primary="Takei" secondary="Factory" />
          </ListItem>
          <ListItem>
            <Avatar sx={{ marginRight: 2 }}>K</Avatar>
            <ListItemText primary="Suzuki" secondary="Procurement" />
          </ListItem>
          <ListItem>
            <Avatar sx={{ marginRight: 2 }}>L</Avatar>
            <ListItemText primary="Kawabata" secondary="Engineer" />
          </ListItem>
        </List>
      </Box>

      {/* Chat Panel */}
      <Box sx={{ flexGrow: 1, padding: 2, display: "flex", flexDirection: "column" }}>
        {/* Chat Messages */}
        <Box sx={{ flexGrow: 1, overflowY: "hidden", marginBottom: 2 }}>
          {messages.map((message, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
                {message.sender}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, color: "white" }}>
                <span>{message.message}</span> 
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {message.time}
              </Typography>
            </Box>
          ))}
          {/* Scroll to the bottom */}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ display: "flex" }}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            sx={{ marginRight: 2 }}
          />
          <Button onClick={handleSendMessage} variant="contained" sx={{ height: "100%" }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatComponent;

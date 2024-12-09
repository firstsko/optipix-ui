import { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Box, Grid, Chip, Typography, CardMedia, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Chatting from './Chatting.tsx';
import Toolbar from './ToolBar.tsx';


const SyledCardContent = styled(CardContent)( {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)( {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author( { authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">Dec 07, 2024</Typography>
    </Box>
  );
}

export default function MainContent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("project_id");
  const partId = queryParams.get("part_id");


  interface Annotation {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    imageWidth: number;
    imageHeight: number;
  }

  const cardData = {
    project_id: projectId,
    part_id: partId,
    img: "../src/assets/drew/draw-any-autocad-mechanical-drawings-for-you-"+projectId+".jpg",
    tag: "mechanical part",
    title:
      "This is a mechanical part, with precise dimensions for fitting and securing two components together.",
    authors: [{ name: "Hui Tu", avatar: "/static/images/avatar/3.jpg" }],
  };

  // Use useState for managing annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const [isDrawing, setIsDrawing] = useState(false); 
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [rectStartX, setRectStartX] = useState(0); 
  const [rectStartY, setRectStartY] = useState(0); 
  const [rectWidth, setRectWidth] = useState(0); 
  const [rectHeight, setRectHeight] = useState(0); 
  const [isDrawingRect, setIsDrawingRect] = useState(false); 
  const [rectId, setRectId] = useState(0); 
  const canvasRef = useRef<HTMLCanvasElement | null>(null); 
  const contextRef = useRef<CanvasRenderingContext2D | null>(null); 
  const imageRef = useRef<HTMLImageElement | null>(null); 

  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    initializeCanvas();
    socketRef.current = new WebSocket("ws://localhost:8080/ws/annotation");

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

  const initializeCanvas = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.lineWidth = 5;
        context.lineCap = "round"; 
        context.strokeStyle = "red"; 
        contextRef.current = context;
      }
    }
  };

  const startDrawing = (e: React.MouseEvent) => {
    if (isDrawingRect) {
      const rect = canvasRef.current?.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;
      setRectStartX(startX);
      setRectStartY(startY);
    } else {
      if (contextRef.current && canvasRef.current) {
        setIsDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setLastX(e.clientX - rect.left);
        setLastY(e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(lastX, lastY);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    contextRef.current.closePath();

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); 
    }
  };

  const handleAnnotationClick = () => {
    console.log("start Annotation");
    setIsDrawingRect(true); 
  };

  const handleDrawClick = () => {
    console.log("start drawing");
    setIsDrawingRect(false); 
    setIsDrawing(false);
    initializeCanvas();
  };

  const drawRect = (e: React.MouseEvent) => {
    if (!isDrawingRect || rectStartX === 0 || rectStartY === 0) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRectWidth(x - rectStartX);
    setRectHeight(y - rectStartY);
  };

  const stopRectDrawing = () => {
    if (rectStartX && rectStartY) {
      if (contextRef.current) {
        contextRef.current.beginPath();
        contextRef.current.rect(rectStartX, rectStartY, rectWidth, rectHeight);
        contextRef.current.stroke();
        contextRef.current.closePath();
      }

      const image = imageRef.current;
      const imageWidth = image ? image.width : 0;
      const imageHeight = image ? image.height : 0;

      const annotationData = {
        id: rectId + 1, 
        x: rectStartX,
        y: rectStartY,    
        width: rectWidth,
        height: rectHeight,
        imageWidth,
        imageHeight,
      };

      // Use setAnnotations to update state
      setAnnotations((prevAnnotations) => [...prevAnnotations, annotationData]);
      setRectId(rectId + 1); 
    }
    setRectStartX(0);
    setRectStartY(0);
    setRectWidth(0);
    setRectHeight(0);
  };

  const sendAllAnnotations = () => {
    console.log("Sending annotation data:", { ...cardData, annotations });

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ ...cardData, annotations }));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography>The annotation and discussion about this part's diagram.</Typography>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <CardMedia
            component="img"
            alt="mechanical part image"
            image={cardData.img}
            sx={{
              height: { sm: "auto", md: "50%" },
              aspectRatio: { sm: "16 / 9", md: "" },
              maxWidth: "100%",
              maxHeight: "600px",
              objectFit: "contain",
            }}
            ref={imageRef}
          />

          <canvas
            ref={canvasRef}
            width={2000}
            height={750}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
              cursor: isDrawing || isDrawingRect ? "crosshair" : "default",
            }}
            onMouseDown={startDrawing}
            onMouseMove={isDrawingRect ? drawRect : draw}
            onMouseUp={isDrawingRect ? stopRectDrawing : stopDrawing}
            onMouseLeave={isDrawingRect ? stopRectDrawing : stopDrawing}
          />

          <SyledCardContent>
            <Typography gutterBottom variant="caption" component="div">
              {cardData.tag}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {cardData.title}

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Toolbar  handleDrawClick={handleDrawClick} handleAnnotationClick={handleAnnotationClick} />
                <Button variant="contained" onClick={sendAllAnnotations}>
                  Send Annotations
                </Button>
              </Box>
              <Chip label="waiting Annotation" color="primary" />
            </Typography>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom />
            <Chatting cardData={cardData} />
          </SyledCardContent>

          <Author authors={cardData.authors} />
        </Grid>
      </Grid>
    </Box>
  );
}

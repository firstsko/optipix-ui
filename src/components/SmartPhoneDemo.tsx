import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Toolbar from './ToolBar.tsx'
import ChattingSp from "./ChattingSP.tsx";

const cardData = [
  {
    img: '../src/assets/drew/draw-any-autocad-mechanical-drawings-for-you-4.jpg',
    tag: 'mechanical part',
    title: "This is a mechanical part, with precise dimensions for fitting and securing two components together.",
    authors: [{ name: 'Hui Tu', avatar: '/static/images/avatar/3.jpg' }],
  },
];

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
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
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">Dec 07, 2024</Typography>
    </Box>
  );
}


export default function MainContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography>The annotation and discussion about this part's diagram.</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
      </Box>
      <Grid container spacing={2} columns={12}>     
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[0].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
                maxWidth: '100%',        
                maxHeight: '600px',    
                objectFit: 'contain',  
              }}
            />
              <Toolbar />
              <ChattingSp />
            <Author authors={cardData[0].authors} />
      </Grid>
    
    </Box>
  );
}
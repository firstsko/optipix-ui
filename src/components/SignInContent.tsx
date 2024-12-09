import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import Sitemark from './SitemarkIcon';
import { Link } from 'react-router-dom';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Effortless Communication with Visual Precision',
    description:
      'Simplify collaboration between teams with photos, annotations, and real-time discussions.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Instantly Capture, Communicate, and Collaborate',
    description:
      'Improve workflow efficiency with an intuitive photo-sharing platform built for manufacturing teams.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Visual Collaboration for the Modern Factory',
    description:
      'Enhance clarity and speed in your operations with a tool designed for seamless communication and easy photo annotations.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Bridge the Gap Between Factory Floors and Engineers',
    description:
      'Take control of communication with real-time photo annotations, empowering your teams to resolve issues faster.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} component={Link} to="/">
        <Sitemark />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
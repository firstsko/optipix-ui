import { Stack, IconButton, Tooltip } from '@mui/material';
import { Brush, Delete, TextFields, CropSquare, Undo, Redo } from '@mui/icons-material';

interface ToolbarProps {
  handleDrawClick: () => void;
  handleEraseClick: () => void;
  handleAnnotationClick: () => void;
}

const Toolbar = ({ handleDrawClick, handleEraseClick,handleAnnotationClick }: ToolbarProps) => {
  return (
    <Stack direction="row" spacing={2} sx={{ padding: 1, boxShadow: 0 }}>
      <Tooltip title="Draw">
        <IconButton color="primary" onClick={handleDrawClick}>
          <Brush />
        </IconButton>
      </Tooltip>
      <Tooltip title="Erase">
        <IconButton color="secondary" onClick={handleEraseClick}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Text">
        <IconButton color="primary">
          <TextFields />
        </IconButton>
      </Tooltip>
      <Tooltip title="Annotation" >
        <IconButton color="primary" onClick={handleAnnotationClick} >
          <CropSquare />
        </IconButton>
      </Tooltip>
      <Tooltip title="Undo">
        <IconButton color="default">
          <Undo />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo">
        <IconButton color="default">
          <Redo />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default Toolbar;

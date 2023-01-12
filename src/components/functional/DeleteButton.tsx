import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

type Props = {
    onClick: () => void;
}
const DeleteButton: React.FC<Props> = 
    ({onClick}) => {
  return (
    <Tooltip title="Delete">
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton
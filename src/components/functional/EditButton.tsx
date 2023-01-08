import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

type Props = {
    onClick: () => void;
}
const EditButton: React.FC<Props> = 
    ({onClick}) => {
  return (
    <Tooltip title="Edit">
      <IconButton aria-label="edit" onClick={onClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

export default EditButton
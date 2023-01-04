import React from 'react';
import { Chip } from '@material-ui/core';
import Tag from '../../types/Tag';

type Props = {
  tag: Tag;
};

const TagChip: React.FC<Props> = ({ tag }) => {
  return (
    <Chip
      label={tag.name + ' ' + tag.weight}
      onClick={() => console.log('Chip clicked') //TODO: Increase/decrease tag weight on click
    }
      clickable
      color="secondary" //TODO: Change tag colour based on vote
      variant="outlined"
    />
  );
}

export default TagChip;

import React from 'react';
import { Chip } from '@material-ui/core';
import Tag from '../../types/Tag';
import { postRequest } from '../../services/request';

type Props = {
  tag: Tag;
  post_id: number;
  is_author: boolean;
  setErrorMsg: (val: string) => void;
  setErrorOpen: (val: boolean) => void;
};

const TagChip: React.FC<Props> = ({ tag, post_id, is_author, setErrorMsg, setErrorOpen }) => {
  //If the user is not logged in, they cannot vote (votes are worth 0)
  //If the user is logged in but is not the author, votes are worth 1
  //If the user is the author, votes are worth 5
  const token = localStorage.getItem('token')
  const voteWeight = token ? (is_author) ? 5 : 1 : 0

  const [userWeight, setUserWeight] = React.useState<number>(tag.userWeight)

  function handleClick() {
    if(voteWeight === 0) {
      setErrorMsg('Please log in to vote on tags.')
      setErrorOpen(true)
      return
    }
    const orig_weight = userWeight
    if(userWeight === 0) {
      //Update vote count first for better responsiveness
      setUserWeight(voteWeight)
      postRequest('tags/new', {'token': token , 'name':tag.name, 'post_id':post_id, 'positive': true})
        .then()
        .catch((error: any) => {
          //If API call fails, reset tag to original state and display the error.
          setUserWeight(orig_weight)
          setErrorMsg(error.message)
          setErrorOpen(true)
        });
    }

    //If user is cancelling their vote instead
    else {
      //Update vote count first for better responsiveness
      setUserWeight(0)
      postRequest('tags/revoke', {'token': token , 'name':tag.name, 'post_id':post_id})
        .then()
        .catch((error: any) => {
          //If API call fails, reset tag to original state and display the error.
          setUserWeight(orig_weight)
          setErrorMsg(error.message)
          setErrorOpen(true)
        });
    }
  }

  function handleDoubleClick() {
    if(voteWeight === 0) {
      setErrorMsg('Please log in to vote on tags.')
      setErrorOpen(true)
      return
    }
    const orig_weight = userWeight
    //Even if user previously upvoted a tag, a double click will turn it into a downvote
    if(tag.userWeight >= 0) {
      //Update vote count first for better responsiveness
      setUserWeight(-voteWeight)
      postRequest('tags/new', {'token': token , 'name':tag.name, 'post_id':post_id, 'positive': false})
        .then()
        .catch((error: any) => {
          //If API call fails, reset tag to original state and display the error.
          setUserWeight(orig_weight)
          setErrorMsg(error.message)
          setErrorOpen(true)
        });
    }

    //If user is cancelling their vote instead
    else {
      //Update vote count first for better responsiveness
      setUserWeight(0)
      postRequest('tags/revoke', {'token': token , 'name':tag.name, 'post_id':post_id})
        .then()
        .catch((error: any) => {
          //If API call fails, reset tag to original state and display the error.
          setUserWeight(orig_weight)
          setErrorMsg(error.message)
          setErrorOpen(true)
        });
    }
  }

  return (
    <Chip
      label={tag.name + ' ' + (tag.weight+userWeight)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      clickable
      color={userWeight > 0 ? "primary" : userWeight < 0 ? "secondary" : "default"} //TODO: Change tag colour based on vote
      variant="outlined"
    />
  );
}

export default TagChip;

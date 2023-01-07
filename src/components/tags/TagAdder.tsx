import React from 'react';
import { Container } from '@material-ui/core';
import Tag from '../../types/Tag';
import { postRequest } from '../../services/request';
import TagSearcher from './TagSearcher';

//TagAdder is for the PostInterface, add one tag at a time
type Props = {
    tags:Tag[], 
    setTags: (val: Tag[]) => void,
    is_author: boolean,
    post_id: number
    setErrorMsg: (val: string) => void;
    setErrorOpen: (val: boolean) => void;
}

const TagAdder: React.FC<Props> = 
    ({tags, setTags, is_author, post_id, setErrorMsg, setErrorOpen}) => {

    function submitHandler(newValue: string) {
        const existing_tag = tags.find(tag => tag.name === newValue)
        const weight = is_author ? 5 : 1
        const prev_tags = tags
        if (existing_tag) {
            //If tag already exists, give it an upvote
            setTags(tags.map(tag => tag.name === newValue ? {...tag, userWeight: weight} : tag))
        }
        else {
            setTags([...tags, {name: newValue, weight: 0, userWeight: weight}])
        }

        postRequest('tags/new', {'token': localStorage.getItem('token') , 'name':newValue, 'post_id':post_id, 'positive':true})
        .then()
        .catch((error: any) => {
          //If API call fails, reset tag to original state and display the error.
          setTags(prev_tags)
          setErrorMsg(error.message)
          setErrorOpen(true)
        });

    }

    const onChange = (newValue: string) => {
        submitHandler(newValue)
    }
    
    return (
        <Container maxWidth="xs">
            <TagSearcher onChange={onChange} />
            </Container>)
    }

export default TagAdder
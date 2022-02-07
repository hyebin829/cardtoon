import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHomePost } from '../reducers/post';

import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Input = styled.input`
  display: none;
`;

const HomePostForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch(addHomePost(text));
      setText('');
    },
    [text]
  );

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <TextField
          rows={4}
          multiline
          value={text}
          onChange={onChangeText}
        ></TextField>
        <label>
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button variant="contained" component="span">
            사진
          </Button>
        </label>
        <Button type="submit">확인</Button>
      </form>
    </>
  );
};

export default HomePostForm;

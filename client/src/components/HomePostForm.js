import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHomePost } from '../reducers/post';

import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { UPLOAD_IMAGES_REQUEST } from '../reducers/post';

const Input = styled.input`
  display: none;
`;

const HomePostForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { imagePaths } = useSelector(state => state.post);

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

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  console.log(imagePaths);
  return (
    <>
      <form onSubmit={onSubmitForm} encType="multipart/form-data">
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
            name="image"
            onChange={onChangeImages}
          />
          <Button variant="contained" component="span">
            사진
          </Button>
        </label>
        <Button type="submit">확인</Button>
        {imagePaths.map(v => (
          <div key={v}>
            <img src={`http://localhost:3065/${v}`} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </form>
    </>
  );
};

export default HomePostForm;

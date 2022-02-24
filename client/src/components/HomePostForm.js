import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  addHomePost,
  ADD_HOMEPOST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';

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
  const { imagePaths, addHomePostDone } = useSelector(state => state.post);
  const navigate = useNavigate();

  const onSubmitForm = useCallback(
    e => {
      if (!text || !text.trim()) {
        e.preventDefault();
        return alert('게시글을 작성해주세요');
      }
      e.preventDefault();
      const formData = new FormData();
      imagePaths.forEach(p => {
        formData.append('image', p);
      });
      formData.append('content', text);
      dispatch({
        type: ADD_HOMEPOST_REQUEST,
        data: formData,
      });
      setText('');
      alert('작성되었습니다.');
      navigate('/');
      // location.reload();
    },
    [text, imagePaths]
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
    return dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

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
        {imagePaths.map((v, i) => (
          <div key={v}>
            <img src={`http://localhost:3065/${v}`} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </form>
    </>
  );
};

export default HomePostForm;

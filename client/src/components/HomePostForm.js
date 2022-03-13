import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ADD_HOMEPOST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';

import MainMenu from '../components/MenuBar';

import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import { Button, Grid, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Input = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 170px;
  height: 170px;
  margin: 0 auto;
  display: block;
`;

const ButtonWrap = styled.div`
  text-align: right;
  padding: 0 16px;
`;

const DeleteButtonWrap = styled.div`
  text-align: right;
`;

const HomePostForm = () => {
  const [text, setText] = useState('');
  const [imageLengthError, setImageLengthError] = useState(false);
  const dispatch = useDispatch();
  const { imagePaths } = useSelector(state => state.post);
  const navigate = useNavigate();

  const onSubmitForm = useCallback(
    e => {
      if (!text || !text.trim()) {
        e.preventDefault();
        return alert('게시글을 작성해주세요');
      }
      if (imagePaths.length === 0) {
        e.preventDefault();
        return alert('사진을 첨부해주세요.');
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
    e.target.files.length > 10
      ? setImageLengthError(true)
      : setImageLengthError(false);
    console.log(imageLengthError);
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
    console.log(imagePaths);
    imagePaths.length - 1 > 10
      ? setImageLengthError(true)
      : setImageLengthError(false);
  });

  return (
    <>
      <form onSubmit={onSubmitForm} encType="multipart/form-data">
        <TextField
          sx={{ padding: 2 }}
          rows={4}
          multiline
          value={text}
          onChange={onChangeText}
          fullWidth
          inputProps={{
            maxLength: 1500,
          }}
          placeholder="내용을 입력해주세요"
        />
        <ButtonWrap>
          <label>
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              name="image"
              onChange={onChangeImages}
            />

            <Button variant="outlined" component="span" sx={{ mr: 1 }}>
              사진
            </Button>
          </label>
          {imageLengthError ? (
            <>
              <Button disabled>게시글 업로드</Button>
              <div>10장 이하의 사진만 업로드 가능합니다.</div>
            </>
          ) : (
            <Button type="submit" variant="contained">
              게시글 업로드
            </Button>
          )}
        </ButtonWrap>
        <Grid container rowSpacing={1} columns={16} sx={{ padding: 2 }}>
          {imagePaths.map((v, i) => (
            <Grid xs={8}>
              <div key={v}>
                <ImagePreview src={`http://localhost:3065/${v}`} alt={v} />
                <DeleteButtonWrap>
                  <Button onClick={onRemoveImage(i)} sx={{ padding: 0 }}>
                    <ClearIcon />
                  </Button>
                </DeleteButtonWrap>
              </div>
            </Grid>
          ))}
        </Grid>
      </form>
      <MainMenu />
    </>
  );
};

export default HomePostForm;

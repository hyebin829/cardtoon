import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ADD_HOMEPOST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';

import MainMenu from '../components/MenuBar';

import { styled } from '@mui/system';

import TextField from '@mui/material/TextField';
import { Button, Grid, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CardtoonAppBar from './CardtoonAppBar';

const Input = styled('input')({
  display: 'none',
});

const ImagePreview = styled('img')(({ theme }) => ({
  display: 'flex',
  width: '170px',
  height: '170px',
  justifyContent: 'center',
  display: 'block',
  [theme.breakpoints.up('tabletM')]: {
    width: '250px',
    height: '250px',
  },
}));

const ButtonWrap = styled('div')({
  textAlign: 'right',
  padding: '0 16px',
  marginBottom: '10px',
});

const DeleteButtonWrap = styled('div')({
  textAlign: 'right',
});

const PreviewText = styled('div')({
  textAlign: 'left',
  color: '#40101d',
  fontSize: '15px',
});

const Text = styled('div')({
  fontSize: '15px',
  marginTop: '5px',
  color: 'grey',
});

const CardBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('tabletM')]: {
    padding: '10px 70px',
  },
  [theme.breakpoints.up('tabletL')]: {
    padding: '20px 120px',
  },
  [theme.breakpoints.up('desktop')]: {
    padding: '30px 330px',
  },
}));

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
    imagePaths.length - 1 > 10
      ? setImageLengthError(true)
      : setImageLengthError(false);
  });

  return (
    <>
      <CardtoonAppBar />
      <CardBox>
        <form onSubmit={onSubmitForm} encType="multipart/form-data">
          <TextField
            sx={{ padding: 2 }}
            rows={5}
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
            <Text>1:1 비율의 사진을 권장합니다.</Text>
            <PreviewText>▼ 사진 미리보기</PreviewText>
          </ButtonWrap>

          <Grid container rowSpacing={1} justifyContent="center">
            {imagePaths.map((v, i) => (
              <Grid key={i}>
                <ImagePreview
                  src={`http://localhost:3065/${v}`}
                  alt={v}
                  sx={{ margin: '16px 16px 0 16px' }}
                  draggable={false}
                />
                <DeleteButtonWrap>
                  <Button onClick={onRemoveImage(i)} sx={{ padding: 0 }}>
                    <ClearIcon />
                  </Button>
                </DeleteButtonWrap>
              </Grid>
            ))}
          </Grid>
        </form>
      </CardBox>
      <MainMenu />
    </>
  );
};

export default HomePostForm;

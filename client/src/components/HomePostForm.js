import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHomePost } from '../reducers/post';

const HomePostForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch(addHomePost(text));
    },
    [text]
  );

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <textarea value={text} onChange={onChangeText}></textarea>
        <button>사진</button>
        <button type="submit">확인</button>
      </form>
    </>
  );
};

export default HomePostForm;

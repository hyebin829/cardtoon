import React, { useCallback, useState } from 'react';

const HomePostForm = () => {
  const [text, setText] = useState('');

  const onSubmitForm = () => {};

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

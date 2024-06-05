import React from 'react';
import { TextField, Paper, Button } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './NewPost.module.scss';
import { Link } from 'react-router-dom';

const NewPost = () => {
  const imageUrl = '';
  const [value, setValue] = React.useState('');

  const handleChangeFile = () => {
    alert('File changed !');
  };

  const onClickRemoveImage = () => {
    alert(`File deleted !`);
  };

  const onChange = React.useCallback((val) => {
    setValue(val);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper className={styles.paper}>
      <Button variant="outlined" size="large">
        LOAD PREVIEW...
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          DELETE
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:7777${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title ..."
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="TAGS" fullWidth />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Publish
        </Button>
        <Link to={'/'}>
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default NewPost;

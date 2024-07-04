import React from 'react';
import { TextField, Paper, Button } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './NewPost.module.scss';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { userIsAuthorized } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { uploadImage } from './../../http/api/imgAPI';
import { uploadPost, savePostChanges, getPostById } from '../../http/api/postAPI';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

const NewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthorized = useSelector(userIsAuthorized);
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const imageRef = React.useRef(null);
  const [isPostLoading, setIsPostLoading] = React.useState(true);
  const [isErrorShown, setIsErrorShown] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const isEditable = Boolean(id);

  React.useEffect(() => {
    if (id) {
      setIsPostLoading(true);
      getPostById(id)
        .then((result) => {
          const { data } = result;
          setTitle(data.title);
          setTags(data.tags.join(','));
          setImageUrl(data.imageUrl);
          setText(data.text);
        })
        .catch((er) => console.log(er))
        .finally(setIsPostLoading(false));
    } else {
      setIsPostLoading(false);
    }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const img = event.target.files[0];
      formData.append('image', img);
      const data = await uploadImage(formData);
      setImageUrl(data.url);
    } catch (error) {
      setAlertMessage(`UPLOAD image Error: ${error}`);
      setIsErrorShown(true);
      console.log('UPLOAD image Error: ', error);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((val) => {
    setText(val);
  }, []);

  const onSubmit = async () => {
    try {
      const tgs = tags.split(',').map((item) => item.trim());
      const params = {
        title,
        text,
        imageUrl,
        tags: tgs,
      };
      const data = isEditable ? await savePostChanges(params, id) : await uploadPost(params);
      const _id = isEditable ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);
      setIsErrorShown(true);
    }
  };

  // Settings of the react-simplemde-editor
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

  const closeAlert = () => {
    setAlertMessage('');
    setIsErrorShown(false);
  };

  if (!isAuthorized) {
    return <Navigate to={'/login'} />;
  }

  if (isPostLoading) {
    return <center>Loading...</center>;
  }

  return (
    <Paper className={styles.paper}>
      <div className={styles.uploadBttn}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            imageRef.current.click();
          }}
        >
          LOAD PREVIEW...
        </Button>
        <input ref={imageRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <Button variant="outlined" size="large" color="error" onClick={onClickRemoveImage}>
            DELETE
          </Button>
        )}
      </div>
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:7777${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title ..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="TAGS"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditable ? 'Save changes' : 'Publish'}
        </Button>
        <Link to={'/'}>
          <Button size="large">Cancel</Button>
        </Link>
      </div>
      {isErrorShown && (
        <Alert severity="error" onClose={closeAlert}>
          <AlertTitle>ERROR</AlertTitle>
          {alertMessage}
        </Alert>
      )}
    </Paper>
  );
};

export default NewPost;

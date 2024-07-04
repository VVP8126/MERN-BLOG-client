import React from 'react';
import { TextField, Avatar, Button, LinearProgress } from '@mui/material';
import styles from './Comment.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateComment } from '../../redux/slices/comments';
import AppSnackbar from '../AppSnackBar';

const Comment = ({ postId }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const commentData = useSelector((state) => state.comments);

  const [commentText, setCommentText] = React.useState('');
  const [isSnackOpen, setIsSnackOpen] = React.useState(false);

  const changeSnackState = (newState) => {
    setIsSnackOpen(newState);
  };

  const onClick = () => {
    if (userData) {
      try {
        const params = {
          commentText,
          userId: userData._id,
          postId,
        };
        dispatch(fetchCreateComment(params));
        setCommentText('');
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsSnackOpen(true);
    }
  };

  const onCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const clearText = () => {
    setCommentText('');
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Write comment"
            value={commentText}
            onChange={onCommentTextChange}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          {commentData.status === 'loading' && <LinearProgress />}
          <div className={styles.bttnBlock}>
            <Button disabled={commentText.length < 2} variant="contained" onClick={onClick}>
              SAVE
            </Button>
            <AppSnackbar
              message={'LOG IN (or Register), please !'}
              open={isSnackOpen}
              setOpen={changeSnackState}
            />
            {commentText.length >= 2 && (
              <Button variant="contained" color="error" onClick={clearText}>
                CLEAR
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;

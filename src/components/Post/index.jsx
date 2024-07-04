import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Post.module.scss';
import PostSkeleton from './PostSkeleton';
import UInfo from '../UInfo';
import DeleteDialog from '../DeleteDialog';
import { fetchRemovePostAndComments } from '../../redux/slices/posts';
import { changePage } from '../../redux/slices/pagination';
import { fetchPostsCount } from '../../redux/slices/pagination';
import { fetchPostsPaginating } from '../../redux/slices/posts';
import { useNavigate } from 'react-router-dom';

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const limit = useSelector((state) => state.pagination.limit);
  const [isDelDialogOpened, setIsDelDialogOpened] = React.useState(false);

  const onClickDelete = () => {
    dispatch(fetchRemovePostAndComments(_id));
    dispatch(fetchPostsCount());
    dispatch(changePage(1));
    dispatch(fetchPostsPaginating({ limit, pg: 1 }));
    closeDelDialog();
    navigate('/');
  };

  const openDelDialog = () => {
    setIsDelDialogOpened(true);
  };

  const closeDelDialog = () => {
    setIsDelDialogOpened(false);
  };

  if (isLoading) {
    return <PostSkeleton />;
  }
  return (
    <>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
          <div className={styles.editButtons}>
            <Link to={`/posts/${_id}/edit`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={openDelDialog} color="secondary">
              <ClearIcon />
            </IconButton>
          </div>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          />
        )}
        <div className={styles.wrapper}>
          <UInfo {...user} text={createdAt} />
          <div className={styles.indention}>
            <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
              {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
            </h2>
            <ul className={styles.tags}>
              {tags.map((index, tag) => (
                <li key={index}>
                  <Link to={`/tags/${tags[tag].trim()}`}>{tags[tag].trim()}</Link>
                </li>
              ))}
            </ul>
            {children && <div className={styles.content}>{children}</div>}
            <ul className={styles.postDetails}>
              <Tooltip title="Total views count">
                <li>
                  <EyeIcon></EyeIcon>
                  <span> {viewsCount} </span>
                </li>
              </Tooltip>
              {isFullPost && (
                <Tooltip title="Total comments count">
                  <li>
                    <CommentIcon />
                    <span>{commentsCount}</span>
                  </li>
                </Tooltip>
              )}
            </ul>
          </div>
        </div>
      </div>
      <DeleteDialog
        open={isDelDialogOpened}
        handleConfirm={onClickDelete}
        handleClose={closeDelDialog}
      />
    </>
  );
};

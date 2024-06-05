import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';

import styles from './Post.module.scss';
import PostSkeleton from './PostSkeleton';
import UInfo from '../UInfo';

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
  const onClickDelete = () => {
    alert('DELETE');
  };

  if (isLoading) {
    return <PostSkeleton />;
  }
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickDelete} color="secondary">
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
                <Link to={`/tag/${tag}`}>{tag}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon></EyeIcon>
              <span> {viewsCount} </span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

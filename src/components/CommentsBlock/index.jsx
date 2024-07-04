import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  List,
  Skeleton,
} from '@mui/material';
import SideBlock from '../SideBlock';
import styles from './CommentsBlock.module.scss';
import { formatDate } from '../../utils/formatter';

const CommentsBlock = ({ items, children, isLoading, isFullPage }) => {
  return (
    <SideBlock title={'COMMENTS'}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl}></Avatar>
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div className={styles.skeleton}>
                  <Skeleton variant="text" height={25} width={100} />
                  <Skeleton variant="text" height={18} width={100} />
                </div>
              ) : (
                <ListItemText
                  primary={obj?.user?.fullName}
                  secondary={!isFullPage ? obj?.post?.title : obj?.commentText}
                />
              )}
            </ListItem>
            <p className={styles.dateLbl}>{formatDate(obj?.updatedAt)}</p>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};

export default CommentsBlock;

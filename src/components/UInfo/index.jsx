import React from 'react';
import styles from './UInfo.module.scss';
import { formatDate } from '../../utils/formatter';
import AccountCircleSharp from '@mui/icons-material/AccountCircleSharp';

const UInfo = ({ avatarUrl, fullName, text }) => {
  return (
    <div className={styles.root}>
      {avatarUrl && avatarUrl.length > 0 ? (
        <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      ) : (
        <AccountCircleSharp fontSize="large" />
      )}
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.text}>{formatDate(text)}</span>
      </div>
    </div>
  );
};

export default UInfo;

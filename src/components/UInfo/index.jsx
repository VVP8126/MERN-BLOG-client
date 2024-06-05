import React from 'react';
import styles from './UInfo.module.scss';

const UInfo = ({ avatar, fname, text }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar || '/noavatar.png'} alt={fname} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fname}</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
};

export default UInfo;

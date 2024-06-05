import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import Skeleton from '@mui/material/Skeleton';
import SideBlock from '../SideBlock';
import styles from './TagsBlock.module.scss';
import { Link } from 'react-router-dom';

const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title={'TAGS'}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, index) => (
          <Link href={`/tags/${name}`} className={styles.tagName}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};

export default TagsBlock;

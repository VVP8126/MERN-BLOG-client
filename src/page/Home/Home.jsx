import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import TagsBlock from '../../components/TagsBlock';
import CommentsBlock from '../../components/CommentsBlock';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <>
      <Tabs className={styles.tabs} value={1} aria-label="DDDDD">
        <Tab label="NEW">NEW</Tab>
        <Tab label="POPULAR">POPULAR</Tab>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {[...Array(5)].map((index) => (
            <Post
              d={1}
              title="Some TITLE"
              imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={{
                avatarUrl:
                  'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                fullName: 'Full Name',
              }}
              createdAt={'4/06/2024'}
              viewsCount={150}
              commentsCount={3}
              tags={['TAG-1', 'TAG-4', 'TAG-7']}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['TAG-1', 'TAG-4', 'TAG-7']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'User User1',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'First comment',
              },
              {
                user: {
                  fullName: 'User User2',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

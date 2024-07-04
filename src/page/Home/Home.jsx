import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import Pagination from '../../components/PaginationBar';
import TagsBlock from '../../components/TagsBlock';
import CommentsBlock from '../../components/CommentsBlock';
import styles from './Home.module.scss';
import { fetchPosts, fetchTags, fetchAuthorPosts } from '../../redux/slices/posts';
import { fetchLastComments } from '../../redux/slices/comments';

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const lastComments = useSelector((state) => state.comments.comments);
  const { posts, tags } = useSelector((state) => state.posts);
  const isLoading = posts.status === 'loading';
  const isTagBlockLoading = tags.status === 'loading';
  const isCommentsBlockLoading = lastComments.status === 'loading';

  const [currentTab, setCurrentTab] = React.useState(0);
  const isFirstLoaded = React.useRef(false);

  const changeCurrentTab = (newValue) => {
    setCurrentTab(newValue);
    if (newValue === 1) {
      dispatch(fetchAuthorPosts(userData._id));
    } else {
      dispatch(fetchPosts());
    }
  };

  React.useEffect(() => {
    if (!isFirstLoaded.current) {
      dispatch(fetchPosts());
      dispatch(fetchTags());
      dispatch(fetchLastComments());
      isFirstLoaded.current = true;
      // console.log('First view');
    }
  }, []);

  return (
    <>
      <Tabs className={styles.tabs} value={currentTab} aria-label="DDDDD">
        <Tab label="ALL" onClick={() => changeCurrentTab(0)} />
        <Tab label="MY" onClick={() => changeCurrentTab(1)} disabled={!userData} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoading ? [...Array(5)] : posts.items).map((item, index) =>
            isLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                _id={item._id}
                title={item.title}
                imageUrl={
                  item.imageUrl
                    ? `http://localhost:7777${item.imageUrl}`
                    : 'https://catherineasquithgallery.com/uploads/posts/2021-02/1613545488_176-p-kartinki-na-belom-fone-dlya-prezentatsii-198.jpg'
                }
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={item.tags}
                isEditable={userData?._id === item.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagBlockLoading} />
          <CommentsBlock
            isLoading={isCommentsBlockLoading}
            items={lastComments.items}
            isFullPage={false}
          />
        </Grid>
      </Grid>
      {!currentTab && <Pagination />}
    </>
  );
};

export default Home;

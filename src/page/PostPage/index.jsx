import React from 'react';
import { Post } from '../../components/Post';
import CommentsBlock from '../../components/CommentsBlock';
import Comment from '../../components/Comment';

const PostPage = () => {
  return (
    <>
      <Post
        id={1}
        title={'Roast the code #1 | Rock Paper Scissors'}
        imageUrl={
          'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
        }
        user={{
          avatarUrl:
            'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
          fullName: 'Full NAME',
        }}
        createdAt={'4-06-2024'}
        viewsCount={100}
        commentsCount={100}
        tags={['TAG-1', 'TAG-2', 'TAG-4', 'TAG-5']}
        isFullPost
      >
        <p>
          Blablabla bla blabla bla blabla blalala blabla bla bla. Blabla bla-bla bla bla blablabla
          blalala blabla bla bla. Blabla bla bla bla blabla blalala blabla bla bla. Blabla bla bla
          bla blabla blalala blabla bla bla. Blabla bla bla bla blabla blalala blabla bla bla.
          Blabla bla bla bla blabla blalala blabla bla bla blalala blabla bla bla blalala blabla bla
          bla. Blablabla bla blabla bla blabla blalala blabla bla bla. Blabla bla-bla bla bla
          blablabla blalala blabla bla bla. Blabla bla bla bla blabla blalala blabla bla bla. Blabla
          bla bla bla blabla blalala blabla bla bla. Blabla bla bla bla blabla blalala blabla bla
          bla. Blabla bla bla bla blabla blalala blabla bla bla blalala blabla bla bla blalala
          blabla bla bla.
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'User User1',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Test comment 1',
          },
          {
            user: {
              fullName: 'User User2',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'Test comment 2',
          },
        ]}
        isLoading={false}
      >
        <Comment />
      </CommentsBlock>
    </>
  );
};

export default PostPage;

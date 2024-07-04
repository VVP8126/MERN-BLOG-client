import React from 'react';
import { Post } from '../../components/Post';
import CommentsBlock from '../../components/CommentsBlock';
import Comment from '../../components/Comment';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../http/api/postAPI';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostComments } from '../../redux/slices/comments';

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const postComments = useSelector((state) => state.comments.comments);
  const isCommentsBlockLoading = postComments.status === 'loading';

  const [postData, setPostData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getPostById(id)
      .then((data) => {
        setIsLoading(true);
        setPostData(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
    dispatch(fetchPostComments(id));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        _id={postData._id}
        title={postData.title}
        imageUrl={
          postData.imageUrl
            ? `http://localhost:7777${postData.imageUrl}`
            : 'https://catherineasquithgallery.com/uploads/posts/2021-02/1613545488_176-p-kartinki-na-belom-fone-dlya-prezentatsii-198.jpg'
        }
        user={postData.user}
        createdAt={postData.createdAt}
        viewsCount={postData.viewsCount}
        commentsCount={postComments.items.length}
        tags={postData.tags}
        isFullPost={true}
      >
        <ReactMarkdown children={postData.text} />
      </Post>
      <CommentsBlock
        items={postComments.items}
        isLoading={isCommentsBlockLoading}
        isFullPage={true}
      >
        <Comment postId={id} />
      </CommentsBlock>
    </>
  );
};

export default PostPage;

/** 
 * [
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
        ]
*/

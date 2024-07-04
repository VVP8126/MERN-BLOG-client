import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '../../utils/formatter';
import styles from './TaggedPost.module.scss';

const TaggedPost = () => {
  const { tag } = useParams();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { posts } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    try {
      setItems(posts.items.filter((p) => p.tags.includes(tag.trim())));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onReturnClick = () => {
    navigate('/');
  };

  const onCardClick = (id) => {
    navigate(`/posts/${id}`);
  };

  // console.log('Passed posts: ', posts?.items);

  return (
    <Container className={styles.container}>
      <div className={styles.searchTagsResultHeader}>
        <em>Search result by TAG:</em>
        <Chip label={tag} className={styles.chip} />
        <em>
          Found {items.length} item {items.length === 1 ? '' : '(s)'}
        </em>
      </div>
      {!isLoading ? (
        items?.length ? (
          items.map((item) => (
            <Card key={item._id} className={styles.card}>
              <CardActionArea onClick={() => onCardClick(item._id)}>
                <CardMedia
                  component="img"
                  image={
                    item.imageUrl
                      ? `http://localhost:7777${item.imageUrl}`
                      : 'https://catherineasquithgallery.com/uploads/posts/2021-02/1613545488_176-p-kartinki-na-belom-fone-dlya-prezentatsii-198.jpg'
                  }
                  alt="Image not found"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="overline"
                    component="div"
                    className={styles.author}
                  >
                    <span>BY {item.user.fullName}</span>
                    <span>
                      <em>on {formatDate(item.createdAt)}</em>
                    </span>
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    {item.text.substring(0, 80)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <div className={styles.notFound}>
            <center>
              <SentimentVeryDissatisfiedIcon fontSize="large" />
              <p>Nothing is found on defined conditions</p>
              <Button onClick={onReturnClick} variant="contained" startIcon={<EditNoteIcon />}>
                Select another TAG
              </Button>
            </center>
          </div>
        )
      ) : (
        <p>Loading ...</p>
      )}
    </Container>
  );
};

export default TaggedPost;

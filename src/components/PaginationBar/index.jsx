import React from 'react';
import { Pagination, Container } from '@mui/material';
import styles from './PaginationBar.module.scss';
import SelectPageBox from '../SelectPageBox';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, changeLimit, fetchPostsCount } from '../../redux/slices/pagination';
import { fetchPostsPaginating } from '../../redux/slices/posts';

const PaginationBar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);
  const pages = useSelector((state) => state.pagination.pages);
  const count = useSelector((state) => state.pagination.count);
  const posts = useSelector((state) => state.posts.posts);
  const isPaginationLoaded = useSelector((state) => state.pagination.status);

  React.useEffect(() => {
    dispatch(fetchPostsCount());
  }, [limit, posts]);

  const handleChangeLimit = (event) => {
    dispatch(changeLimit(event.target.value));
    dispatch(changePage(1));
    dispatch(fetchPostsPaginating({ limit: event.target.value, pg: 1 }));
    // console.log('value=', event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(changePage(newPage));
    dispatch(fetchPostsPaginating({ limit, pg: newPage }));
    // console.log(`New page: ${newPage}, of type: ${typeof newPage}`);
  };

  return isPaginationLoaded ? (
    <Container className={styles.pageBar}>
      <Pagination
        count={pages}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        variant="outlined"
      />
      <div className={styles.flexedBetween}>
        <div className={styles.page}>
          <span>PAGE:</span>
          <span>
            {page}/{pages}
          </span>
        </div>
        <SelectPageBox limit={limit} handleChangeLimit={handleChangeLimit} />
      </div>
      <div className={styles.flexedBetween}>
        <div>
          <em>
            <strong>POSTS FOUND:</strong>
          </em>
        </div>
        <div>
          <strong>{count}</strong>
        </div>
      </div>
    </Container>
  ) : (
    <p>...</p>
  );
};

export default PaginationBar;

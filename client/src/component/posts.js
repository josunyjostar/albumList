import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Pagination from './pagination';
import useAjaxStore from '../store/ajaxStore';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;

  border: 1px black solid;
`;

const AticleLayout = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 0;
  padding: 0 0;

  border: 1px red solid;
`;

const BtnLayout = styled.div`
  display: flex;
  align-items: start;

  width: 100%;
  padding: 10px 0px 10px 0px;
  border: 1px blue solid;

  .create {
    margin-left: 5px;
    margin-right: 5px;
  }

  .update {
    margin-right: 5px;
  }

  button {
    border: none;
    border-radius: 10%;
    font-size: 1rem;
    padding: 5px;
  }

  button:hover {
    background-color: tomato;
    color: white;
  }
`;

const POSTS_CNT = 5;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * POSTS_CNT;

  let {albums, getAlbums} = useAjaxStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  useEffect(() => {
    setPosts(albums);
  }, [albums]);

  return (
    <Layout>
      <header>
        <h1>Album List</h1>
      </header>
      <main>
        {posts.slice(offset, offset + POSTS_CNT).map(({id, title}) => (
          <AticleLayout key={id}>
            <h3>
              {id}. {title}
            </h3>
            <img src="https://place-hold.it/400x35/white/Green/blue&fontsize=20" alt="" />
            <BtnLayout>
              <div className="create">
                <button>create</button>
              </div>
              <div className="update">
                <button>update</button>
              </div>
              <div className="delete">
                <button>delete</button>
              </div>
            </BtnLayout>
          </AticleLayout>
        ))}
      </main>
      <footer>
        <Pagination total={posts.length} page={page} setPage={setPage} />
      </footer>
    </Layout>
  );
}

export default Posts;

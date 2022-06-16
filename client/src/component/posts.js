import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import useAjaxStore from '../store/ajaxStore';
import Pagination from './Pagination';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 100%;
  margin: 0 auto;

  border: 1px purple solid;

  button {
    border: none;
    border-radius: ${props => props.theme.borderRadius};
    font-size: ${props => props.theme.btnFontSize};
    padding: 4px;
  }

  button:hover {
    background-color: tomato;
    color: white;
  }

  .create {
    margin: 10px 0 0 0;

    .input {
      font-size: ${props => props.theme.btnFontSize};
      padding-left: 10px;
      margin-right: 10px;
    }
  }
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

const PostBtn = styled.div`
  display: flex;
  align-items: start;

  width: 100%;
  padding: 10px 0px 10px 0px;
  border: 1px blue solid;

  .update {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const PostArea = styled.div`
  width: 100%;
  .content-wrap {
    display: flex;
    justify-content: start;
    width: 100%;

    .content {
      width: 100%;
      min-height: 3vh;
      border: none;
      font-size: ${props => props.theme.fontSize};
    }

    .input-post {
      font-size: ${props => props.theme.fontSize};
      width: 100%;
    }
    .input-wrap {
      width: 100%;
      flex-direction: column;

      .modify {
        float: right;
        margin: 0.5rem 1rem 0.5rem 0;
      }
    }
  }
`;

const POSTS_CNT = 5;

function Posts() {
  const inputRef = useRef(null);
  const [page, setPage] = useState(1);
  const [postId, setPostId] = useState(-1);
  const offset = (page - 1) * POSTS_CNT;

  const {albums, getAlbums, updateAlbum, deleteAlbum, createAlbum} = useAjaxStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  useEffect(() => {
    if (postId > 0) inputRef.current?.focus();
  }, [postId]);

  function updatePost(id) {
    updateAlbum(id, inputRef.current.value);
    setPostId(-1);
  }

  function deletePost(id) {
    deleteAlbum(id);
  }

  function createPost(e) {
    e.preventDefault();
    let {userId, title} = e.target;
    createAlbum(userId.value, title.value);
    e.target.userId.value = '';
    e.target.title.value = '';
  }

  return (
    <Layout>
      <header>
        <h1>Album List</h1>
      </header>
      <main>
        {albums.slice(offset, offset + POSTS_CNT).map(({id, title}) => (
          <AticleLayout key={id}>
            <PostArea>
              <div className="content-wrap">
                {postId === id ? (
                  <div className="input-wrap">
                    <input ref={inputRef} className="input-post" defaultValue={title} />
                    <button
                      className="modify"
                      onClick={() => {
                        updatePost(id);
                      }}
                    >
                      modify
                    </button>
                  </div>
                ) : (
                  <div className="content">{id + '.' + title}</div>
                )}
              </div>
            </PostArea>
            <img src="https://place-hold.it/400x35/white/Green/blue&fontsize=20" alt="" />
            <PostBtn>
              <div className="update">
                <button
                  onClick={() => {
                    setPostId(id);
                  }}
                >
                  update
                </button>
              </div>
              <div
                className="delete"
                onClick={() => {
                  deletePost(id);
                }}
              >
                <button>delete</button>
              </div>
            </PostBtn>
          </AticleLayout>
        ))}
        <form className="create" onSubmit={createPost}>
          <input className="input" placeholder="userId" name="userId" />
          <input className="input" placeholder="title" name="title" />
          <button type="submit">create</button>
        </form>
      </main>
      <footer>
        <Pagination total={albums.length} page={page} setPage={setPage} />
      </footer>
    </Layout>
  );
}

export default Posts;

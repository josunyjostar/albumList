import React from 'react';
import Posts from './component/posts';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80vw;
  margin: auto auto;
  border: none;
`;

const App = () => {
  return (
    <Layout>
      <Posts />
    </Layout>
  );
};

export default App;

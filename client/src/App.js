import React from 'react';
import Posts from './component/Posts';
import GlobalStyle from './styles/GlobalStyle';
import Theme from './styles/Theme';
import styled, {ThemeProvider} from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
  border: none;
`;

const App = () => {
  return (
    <Layout>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Posts />
      </ThemeProvider>
    </Layout>
  );
};

export default App;

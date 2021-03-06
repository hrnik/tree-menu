import { createGlobalStyle } from "styled-components";
import { Header, SideBar, Container, Content, Main } from "./components/Layout";
import Menu from "./Menu";
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    color: rgb(39, 40, 44);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smsoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

`;

function App() {
  return (
    <Container>
      <GlobalStyle />

      <Header />
      <Main>
        <SideBar>
          <Menu />
        </SideBar>
        <Content></Content>
        <div />
      </Main>
    </Container>
  );
}

export default App;

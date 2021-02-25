import { createGlobalStyle } from "styled-components";
import { Header, SideBar, Container, Content, Main } from "./components/Layout";
const GlobalStyle = createGlobalStyle`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smsoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />

      <Header />
      <Main>
        <SideBar></SideBar>
        <Content></Content>
        <div />
      </Main>
    </Container>
  );
}

export default App;

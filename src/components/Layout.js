import styled from "styled-components";

export const Header = styled.header`
  background: black;
`;

export const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: 272px 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
`;

export const Content = styled.div`
  padding: 20px;
  overflow: scroll;
`;

export const SideBar = styled.aside`
  border-right: 1px solid rgba(39, 40, 44, 0.2);
  overflow: scroll;
`;

import styled from "styled-components";

export const TreeItemRow = styled.div`
  padding-left: ${(props) => `${20 + props.level * 16}px`};
  /* font-weight: ${(props) => (props.isSelected ? "bold" : "regular")}; */
  padding-top: 8px;
  padding-bottom: 8px;

  background: ${(props) => props.isSelected && "gray"};

  /* transition: background 0.2s ease-in-out; */
  cursor: pointer;
  :hover {
    background: gray;
  }
`;

export const TreeItemWrapper = styled.div`
  padding-left: ${(props) => `${20 + props.level * 16}px`};
  /* font-weight: ${(props) => (props.isSelected ? "bold" : "regular")}; */
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const TreeItemContainer = styled.div`
  position: relative;
  font-weight: ${(props) => (props.isSelected ? "bold" : "regular")};
`;

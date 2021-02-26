import styled from "styled-components";

export const TreeItemRow = styled.div`
  padding-left: ${(props) => `${20 + props.level * 16}px`};

  background: ${(props) => props.isSelected && "gray"};
  cursor: pointer;
  :hover {
    background: gray;
  }
`;

export const TreeItemWrapper = styled.div`
  padding-left: ${(props) => `${20 + props.level * 16}px`};
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const TreeItemContainer = styled.div`
  position: relative;
  font-weight: ${(props) => (props.isSelected ? 600 : "regular")};
`;

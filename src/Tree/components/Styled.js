import styled from "styled-components";

const COLORS = {
  HOVER_NODE: "#f4f4f4",
  HOVER_ANCHOR: "#e9e9e9",
};

export const TreeItemRow = styled.div`
  padding-left: 32px;
  padding-right: 32px;

  background: ${(props) => props.isSelected && COLORS.HOVER_NODE};
  cursor: pointer;
  :hover {
    background: ${(props) =>
      props.isAnchor ? COLORS.HOVER_ANCHOR : COLORS.HOVER_NODE};
  }

  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
`;

export const TreeItemWrapper = styled.div`
  padding-left: ${(props) => `${props.level * 16}px`};
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const TreeItemContainer = styled.div`
  position: relative;
  font-weight: ${(props) => (props.isSelected ? 600 : "regular")};
`;

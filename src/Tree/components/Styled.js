import styled from "styled-components";

const COLORS = {
  HOVER_NODE: "#f4f4f4",
  HOVER_ANCHOR: "#e9e9e9",
};

export const TreeItemRow = styled.div`
  padding: 8px 32px;
  padding-left: ${(props) => `${32 + props.level * 16}px`};

  background: ${(props) => props.isSelected && COLORS.HOVER_NODE};

  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  transition: background 0.3s;

  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.isAnchor ? COLORS.HOVER_ANCHOR : COLORS.HOVER_NODE};
  }
`;

export const TreeItemLink = styled.a`
  position: relative;
  font-weight: ${(props) => (props.isSelected ? 600 : "regular")};
  color: inherit;
  text-decoration: none;
`;

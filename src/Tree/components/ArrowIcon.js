import { ReactComponent as Arrow } from "./arrow.svg";
import styled from "styled-components";

const ArrowContainer = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  left: -16px;
  svg {
    transform: ${(props) => (props.isDown ? "rotate(0)" : "rotate(90deg)")};
    transition: transform 0.2s ease-in;
  }
`;

const ArrowIcon = (props) => (
  <ArrowContainer {...props}>
    <Arrow />
  </ArrowContainer>
);

export default ArrowIcon;

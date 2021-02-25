import { ReactComponent as Arrow } from "./arrow.svg";
import styled from "styled-components";

const ArrowContainer = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  left: -16px;
  svg {
    transform: ${(props) => (props.isDown ? "rotate(0)" : "rotate(180deg)")};
    transition: transform 0.2s ease-in;
  }
`;

const ArrowIcon = (props) => (
  <ArrowContainer {...props}>
    <Arrow />
  </ArrowContainer>
);

export default ArrowIcon;

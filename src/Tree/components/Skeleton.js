import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0% {
    background-position: -5000% 0, 0 0
  }
  50% {
  
    background-position: 5000% 0, 0 0
  }
  100% {
    background-position: -5000% 0, 0 0
  }
`;

const SkeletonItemContainer = styled.div`
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: ${(props) => (props.pl ? `${24 + props.pl * 8}px` : "")};
  padding-right: ${(props) => (props.pr ? `${24 + props.pr * 8}px` : "")};
`;

const SkeletonItemPlaceholder = styled.div`
  height: 20px;
  animation-name: ${loading};
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsl(0deg 0% 90% / 80%) 50%,
      hsl(0deg 0% 65% / 0%)
    ),
    linear-gradient(#f4f4f4 100%, transparent 0);
  background-size: 99% 100%, cover;
`;

const SkeletonItem = ({ pr = 1, pl = 1 }) => (
  <SkeletonItemContainer pr={pr} pl={pl}>
    <SkeletonItemPlaceholder />
  </SkeletonItemContainer>
);

const SkeletonSection = () => (
  <>
    <SkeletonItem pr={5} />
    <SkeletonItem pl={4} pr={2} />
    <SkeletonItem pl={4} pr={8} />
    <SkeletonItem pl={4} pr={2} />
  </>
);

const Skeleton = () => (
  <>
    <SkeletonSection />
    <SkeletonSection />
  </>
);

export default Skeleton;

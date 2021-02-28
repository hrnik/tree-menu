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

const Container = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;

const SkeletonItemContainer = styled.div`
  padding-bottom: 8px;
  padding-top: 8px;
  padding-right: ${(props) => (props.pr ? `${props.pr * 16}px` : "")};
  padding-left: ${(props) => (props.pl ? `${props.pl * 16}px` : "")};
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

const SkeletonItem = ({ pr, pl }) => (
  <SkeletonItemContainer pr={pr} pl={pl}>
    <SkeletonItemPlaceholder />
  </SkeletonItemContainer>
);

const SkeletonSection = () => (
  <>
    <SkeletonItem pr={3} />
    <SkeletonItem pl={1} pr={1} />
    <SkeletonItem pl={1} pr={3} />
    <SkeletonItem pl={1} pr={1} />
  </>
);

const Skeleton = () => (
  <Container>
    <SkeletonSection />
    <SkeletonSection />
  </Container>
);

export default Skeleton;

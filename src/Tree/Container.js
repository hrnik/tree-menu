import { useSpring, animated } from "react-spring";
import useResizeObserver from "use-resize-observer";
import {
  TreeItemRow,
  TreeItemContainer,
  TreeItemWrapper,
} from "./components/Styled";
import ArrowIcon from "./components/ArrowIcon";
import Skeleton from "./components/Skeleton";

const TreeItem = ({ item, onToggle, onSelect, level, isAnchor }) => {
  // const { ref, height = 0 } = useResizeObserver();

  // const props = useSpring({
  //   height: item.isOpen ? height : 0,
  // });

  return (
    <>
      <TreeItemRow isSelected={item.isSelected || isAnchor} isAnchor={isAnchor}>
        <TreeItemWrapper
          level={level}
          onClick={() => (item.pages ? onToggle(item) : onSelect(item))}
        >
          <TreeItemContainer isSelected={item.isSelected}>
            {item.pages &&
              (item.isOpen ? (
                <ArrowIcon isDown={false} />
              ) : (
                <ArrowIcon isDown={true} />
              ))}
            {item.title}
          </TreeItemContainer>
        </TreeItemWrapper>
      </TreeItemRow>

      {/* <animated.div
        style={{
          ...props,
          overflow: "hidden",
          position: "relative",
        }}
      > */}
      {/* <div ref={ref}> */}
      <div>
        {item.anchors &&
          item.isSelected &&
          item.anchors.map((children) => (
            <TreeItem
              item={children}
              onToggle={onToggle}
              onSelect={onSelect}
              key={children.id}
              level={level}
              isAnchor={true}
            />
          ))}

        {item.isOpen &&
          item.pages &&
          item.pages.map((children) => (
            <TreeItem
              item={children}
              onToggle={onToggle}
              onSelect={onSelect}
              key={children.id}
              level={level + 1}
            />
          ))}
      </div>
      {/* </animated.div> */}
    </>
  );
};

const Tree = ({ data, onToggle, onSelect, isLoading }) => {
  if (isLoading) return <Skeleton />;

  return data.map((item) => (
    <TreeItem
      item={item}
      onToggle={onToggle}
      onSelect={onSelect}
      key={item.id}
      level={0}
    />
  ));
};

export default Tree;

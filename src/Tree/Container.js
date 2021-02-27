import { useSpring, animated } from "react-spring";
import useResizeObserver from "use-resize-observer";
import {
  TreeItemRow,
  TreeItemContainer,
  TreeItemWrapper,
} from "./components/TreeItem";
import ArrowIcon from "./components/ArrowIcon";
import Skeleton from "./components/Skeleton";

const TreeItem = ({
  item,
  onToggle,
  onSelect,
  level,
  isSelectedBackground,
}) => {
  const { ref, height = 0 } = useResizeObserver();

  const props = useSpring({
    height: item.isOpen ? height : 0,
  });

  return (
    <>
      <TreeItemRow isSelected={item.isSelected || isSelectedBackground}>
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

        {/* {item.anchors &&
          item.isSelected &&
          item.anchors.map(renderTreeItem(level))} */}
      </TreeItemRow>

      <animated.div
        style={{
          ...props,
          overflow: "hidden",
          position: "relative",
        }}
        className="menu"
      >
        <div ref={ref}>
          {item.anchors &&
            item.isSelected &&
            item.anchors.map((children) => (
              <TreeItem
                item={children}
                onToggle={onToggle}
                onSelect={onSelect}
                key={children.id}
                level={level}
                isSelectedBackground={true}
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
      </animated.div>

      {/* {item.isOpen && item.pages && (
        <animated.div
          style={{
            ...props,
            overflow: "hidden",
            position: "relative",
          }}
          className="menu"
        >
          <div ref={ref}>{item.pages.map(renderTreeItem(level + 1))}</div>
        </animated.div>
      )} */}
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

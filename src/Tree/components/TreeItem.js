import { Component } from "react";
import isEqual from "react-fast-compare";
import { useSpring, animated } from "react-spring";
import useResizeObserver from "use-resize-observer";
import { TreeItemRow, TreeItemLink } from "./Styled";

import ArrowIcon from "./ArrowIcon";

class TreeItem extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.item, nextProps.item);
  }

  render() {
    return <TreeItemView {...this.props} />;
  }
}

const TreeItemView = ({ item, onToggle, onSelect, level, isAnchor }) => {
  const { ref, height = 0 } = useResizeObserver();

  const props = useSpring({
    height: item.isOpen ? height : 0,
  });

  return (
    <>
      <TreeItemRow
        isSelected={item.isSelected || isAnchor}
        isAnchor={isAnchor}
        level={level}
        onClick={() => (item.pages ? onToggle(item) : onSelect(item))}
        data-test-hook="tree-item"
      >
        <TreeItemLink href="#" isSelected={item.isSelected}>
          {item.pages &&
            (item.isOpen ? (
              <ArrowIcon isDown={false} />
            ) : (
              <ArrowIcon isDown={true} />
            ))}
          {item.title}
        </TreeItemLink>
      </TreeItemRow>

      <animated.div
        style={{
          ...props,
          overflow: "hidden",
          position: "relative",
          willChange: "auto",
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
      </animated.div>
    </>
  );
};

export default TreeItem;

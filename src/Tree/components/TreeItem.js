import { Component } from "react";
import isEqual from "react-fast-compare";
import { TreeItemRow, TreeItemContainer, TreeItemWrapper } from "./Styled";
import ArrowIcon from "./ArrowIcon";

class TreeItem extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.item, nextProps.item);
  }

  render() {
    const { item, onToggle, onSelect, level, isAnchor } = this.props;
    return (
      <>
        <TreeItemRow
          isSelected={item.isSelected || isAnchor}
          isAnchor={isAnchor}
        >
          <TreeItemWrapper
            level={level}
            onClick={() => (item.pages ? onToggle(item) : onSelect(item))}
          >
            <TreeItemContainer href="#" isSelected={item.isSelected}>
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
      </>
    );
  }
}

export default TreeItem;

import {
  TreeItemRow,
  TreeItemContainer,
  TreeItemWrapper,
} from "./components/TreeItem";
import ArrowIcon from "./components/ArrowIcon";
import Skeleton from "./components/Skeleton";

const TreeItem = ({ item, onToggle, onSelect, level }) => {
  const renderTreeItem = (children) => (
    <TreeItem
      item={children}
      onToggle={onToggle}
      onSelect={onSelect}
      key={children.id}
      level={level + 1}
    />
  );

  return (
    <>
      <TreeItemRow isSelected={item.isSelected}>
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

        {item.anchors && item.isSelected && item.anchors.map(renderTreeItem)}
      </TreeItemRow>

      {item.isOpen && item.pages && item.pages.map(renderTreeItem)}
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

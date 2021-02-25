import { useEffect, useState } from "react";
import { getTOCs } from "./API";
import {
  TreeItemRow,
  TreeItemContainer,
  TreeItemWrapper,
} from "./Tree/components/TreeItem";
import ArrowIcon from "./Tree/components/ArrowIcon";
import useTree from "./Tree/useTree";

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

  console.log(item.id);
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

const Tree = ({ data, onToggle, onSelect }) =>
  data.map((item) => (
    <TreeItem
      item={item}
      onToggle={onToggle}
      onSelect={onSelect}
      key={item.id}
      level={0}
    />
  ));

const TreeContainer = () => {
  const { tree, selectNode, toggle, setTreeState } = useTree();

  useEffect(async () => {
    const TOCs = await getTOCs();
    setTreeState(TOCs);
  }, []);

  return (
    <div>
      <Tree data={tree} onToggle={toggle} onSelect={selectNode} />
    </div>
  );
};

export default TreeContainer;

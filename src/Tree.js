import {
  TreeItemRow,
  TreeItemContainer,
  TreeItemWrapper,
} from "./Tree/components/TreeItem";
import ArrowIcon from "./Tree/components/ArrowIcon";
import useTree from "./Tree/useTree";

const treeData = {
  allo: {
    title: "allo",
    children: ["1", "2"],
    level: 0,
  },
  "allo 2": {
    title: "allo 2",
    children: ["3"],
    level: 0,
  },
  1: {
    title: "1",
    level: 1,
  },
  2: {
    title: "2",
    level: 1,
  },
  3: {
    title: "3",
    level: 1,
    children: ["4", "5"],
  },
  4: {
    title: "4",
    level: 2,
    anchors: ["anchor1", "anchor2"],
  },
  5: {
    title: "5",
    level: 2,
  },
  anchor1: {
    type: "anchor",
    title: "anchor1",
  },
  anchor2: {
    type: "anchor",
    title: "anchor2",
  },
  rootNodes: ["allo", "allo 2"],
};

const TreeItem = ({ item, onToggle, onSelect, level }) => {
  const renderTreeItem = (children) => (
    <TreeItem
      item={children}
      onToggle={onToggle}
      onSelect={onSelect}
      key={children.title}
      level={level + 1}
    />
  );
  return (
    <>
      <TreeItemRow isSelected={item.isSelected}>
        <TreeItemWrapper
          level={level}
          onClick={() => (item.children ? onToggle(item) : onSelect(item))}
        >
          <TreeItemContainer isSelected={item.isSelected}>
            {item.children &&
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

      {item.isOpen && item.children && item.children.map(renderTreeItem)}
    </>
  );
};

const Tree = ({ data, onToggle, onSelect }) =>
  data.map((item) => (
    <TreeItem
      item={item}
      onToggle={onToggle}
      onSelect={onSelect}
      key={item.title}
      level={0}
    />
  ));

const TreeContainer = () => {
  const { tree, selectNode, toggle } = useTree(treeData);
  console.log(tree);

  return (
    <div>
      <Tree data={tree} onToggle={toggle} onSelect={selectNode} />
    </div>
  );
};

export default TreeContainer;

import { useState, useReducer } from "react";
import {
  TreeItemRow,
  TreeItemContainer,
  TreeItemWrapper,
} from "./components/Tree/TreeItem";
import ArrowIcon from "./components/Tree/ArrowIcon";
import styled from "styled-components";

const Icon = styled.svg`
  width: 8px;
  height: 8px;
`;

const tree = {
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

const reducer = (state, action) => {
  const nodeId = action.payload;
  const previusSelectedAnchor = state.selectedAnchorId;
  const previusSelectedNode = state.selectedNodeId;
  switch (action.type) {
    case "SELECT_PAGE":
      if (nodeId === state.selectedNodeId) return state;

      return {
        ...state,
        [nodeId]: {
          ...state[nodeId],
          isSelected: true,
          isOpen: true,
        },
        [previusSelectedNode]: {
          ...state[previusSelectedNode],
          isSelected: false,
        },
        [previusSelectedAnchor]: {
          ...state[previusSelectedAnchor],
          isSelected: false,
        },
        selectedNodeId: nodeId,
        selectedAnchorId: null,
      };
    case "SELECT_ANCHOR":
      if (nodeId === state.selectedAnchorId) return state;

      return {
        ...state,
        [nodeId]: {
          ...state[nodeId],
          isSelected: true,
        },
        [previusSelectedAnchor]: {
          ...state[previusSelectedAnchor],
          isSelected: false,
        },
        selectedAnchorId: nodeId,
      };
    case "TOOGLE_NODE":
      return {
        ...state,
        [nodeId]: {
          ...state[nodeId],
          isOpen: !state[nodeId].isOpen,
        },
      };
    default:
      throw new Error();
  }
};

const TreeContainer = () => {
  // const [treeData, setTreeData] = useState(tree);
  // const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [state, dispatch] = useReducer(reducer, tree);

  const covnertToTree = (data, rootNodes) =>
    rootNodes.reduce((acc, val) => {
      const node = { ...data[val] };
      if (node && node.children) {
        const newChildren = covnertToTree(data, node.children);
        node.children = [...newChildren];
      }
      if (node && node.anchors) {
        const newAnchors = covnertToTree(data, node.anchors);
        node.anchors = [...newAnchors];
      }
      acc.push(node);

      return acc;
    }, []);

  const onToggle = (node) => {
    dispatch({ type: "TOOGLE_NODE", payload: node.title });
  };

  const onSelect = (node) => {
    if (node.type === "anchor") {
      dispatch({ type: "SELECT_ANCHOR", payload: node.title });
    } else {
      dispatch({ type: "SELECT_PAGE", payload: node.title });
    }
  };

  const convertedTree = covnertToTree(state, ["allo", "allo 2"]);

  console.log("selectNode", state.selectedNodeId);
  console.log("convertedTree", convertedTree);

  return (
    <div className="App">
      <Tree data={convertedTree} onToggle={onToggle} onSelect={onSelect} />
    </div>
  );
};

export default TreeContainer;

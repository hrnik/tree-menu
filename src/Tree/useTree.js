import { useReducer } from "react";

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

const useTree = (initialData) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const toggle = (node) =>
    dispatch({ type: "TOOGLE_NODE", payload: node.title });

  const selectNode = (node) => {
    if (node.type === "anchor") {
      dispatch({
        type: "SELECT_ANCHOR",
        payload: node.title,
      });
    } else {
      dispatch({ type: "SELECT_PAGE", payload: node.title });
    }
  };

  const newState = covnertToTree(state, state.rootNodes);

  return {
    tree: newState,
    selectNode,
    toggle,
  };
};

export default useTree;

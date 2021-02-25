import { useReducer } from "react";
import produce from "immer";

const reducer = produce((state, action) => {
  const nodeId = action.payload;
  const previusSelectedAnchor = state.selectedAnchorId;
  const previusSelectedNode = state.selectedNodeId;
  switch (action.type) {
    case "SELECT_PAGE":
      if (nodeId === state.selectedNodeId) return state;

      state[nodeId].isSelected = true;
      state[nodeId].isOpen = true;

      if (previusSelectedNode) state[previusSelectedNode].isSelected = false;
      if (previusSelectedAnchor)
        state[previusSelectedAnchor].isSelected = false;
      state.selectedNodeId = nodeId;
      state.selectedAnchorId = null;
      break;
    case "SELECT_ANCHOR":
      if (nodeId === state.selectedAnchorId) return state;
      state[nodeId].isSelected = true;
      if (previusSelectedAnchor)
        state[previusSelectedAnchor].isSelected = false;
      state.selectedAnchorId = nodeId;
      break;
    case "TOOGLE_NODE":
      state[nodeId].isOpen = !state[nodeId].isOpen;
      break;
    default:
      return state;
  }
});

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

const useTree = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const newState = covnertToTree(state, state?.rootNodes ?? []);

  return {
    tree: newState,
    selectNode,
    toggle,
  };
};

export default useTree;

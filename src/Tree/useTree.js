import { useReducer } from "react";
import produce from "immer";

const TYPES = {
  SET_STATE: "SET_STATE",
  SELECT_PAGE: "SELECT_PAGE",
  SELECT_ANCHOR: "SELECT_ANCHOR",
  TOOGLE_NODE: "TOOGLE_NODE",

  ANCHOR: "ANCHOR",
  PAGE: "PAGE",
};

const reducer = produce((state, action) => {
  const nodeId = action.payload;
  const previusSelectedAnchor = state.selectedAnchorId;
  const previusSelectedNode = state.selectedNodeId;
  switch (action.type) {
    case TYPES.SET_STATE:
      state = action.payload;
      return state;
    case TYPES.SELECT_PAGE:
      if (nodeId === state.selectedNodeId) return state;

      state.pages[nodeId].isSelected = true;
      state.pages[nodeId].isOpen = true;

      if (previusSelectedNode)
        state.pages[previusSelectedNode].isSelected = false;
      if (previusSelectedAnchor)
        state.anchors[previusSelectedAnchor].isSelected = false;
      state.selectedNodeId = nodeId;
      state.selectedAnchorId = null;
      return state;
    case TYPES.SELECT_ANCHOR:
      if (nodeId === state.selectedAnchorId) return state;
      state.anchors[nodeId].isSelected = true;
      if (previusSelectedAnchor)
        state.anchors[previusSelectedAnchor].isSelected = false;
      state.selectedAnchorId = nodeId;
      return state;
    case TYPES.TOOGLE_NODE:
      state.pages[nodeId].isOpen = !state.pages[nodeId].isOpen;
      return state;
    default:
      return state;
  }
});

const covnertToTree = (data, rootNodes) =>
  rootNodes.reduce((acc, val) => {
    const node = { ...data.pages[val] };
    if (!node) return acc;

    if (node.pages) {
      node.pages = [...covnertToTree(data, node.pages)];
    }
    if (node.isSelected && node.anchors) {
      node.anchors = node.anchors.map((id) => ({
        ...data.anchors[id],
        type: TYPES.ANCHOR,
      }));
    }
    acc.push({ ...node, type: TYPES.PAGE });

    return acc;
  }, []);

const useTree = (
  initialState = {
    pages: {},
    anchors: {},
    selectedAnchorId: null,
    selectedNodeId: null,
    rootNodes: [],
  }
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggle = (node) =>
    dispatch({ type: TYPES.TOOGLE_NODE, payload: node.id });

  const selectNode = (node) => {
    if (node.type === TYPES.ANCHOR) {
      dispatch({
        type: TYPES.SELECT_ANCHOR,
        payload: node.id,
      });
    } else {
      dispatch({ type: TYPES.SELECT_PAGE, payload: node.id });
    }
  };

  const setTreeState = (data) =>
    dispatch({ type: TYPES.SET_STATE, payload: data });

  const newState = covnertToTree(state, state.rootNodes);

  return {
    tree: newState,
    setTreeState,
    selectNode,
    toggle,
  };
};

export default useTree;

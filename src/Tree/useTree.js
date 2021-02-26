import { useReducer } from "react";
import produce from "immer";

const TYPES = {
  SET_STATE: "SET_STATE",
  SELECT_PAGE: "SELECT_PAGE",
  SELECT_ANCHOR: "SELECT_ANCHOR",
  TOOGLE_NODE: "TOOGLE_NODE",
  SET_FILTER: "SET_FILTER",

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
    case TYPES.SET_FILTER:
      const filter = action.payload;
      if (!filter) {
        state.filter = "";
        state.fitleredPages = [];
        state.fitleredAnchors = [];
        return state;
      }

      const filterNode = (node) =>
        node.title.toLowerCase().includes(state.filter.toLowerCase());

      state.filter = filter;
      const filteredPagesWithoutParents = Object.values(state.pages).filter(
        filterNode
      );

      state.filteredPagesIDs = filteredPagesWithoutParents.reduce(
        (acc, page) => {
          if (!acc.includes(page.id)) {
            acc.push(page.id);
          }

          let parentId = page.parentId;

          while (parentId) {
            acc.push(parentId);
            parentId = state.pages[parentId]?.parentId;
          }

          return acc;
        },
        []
      );

      state.filteredAnchorsIDs = Object.values(state.anchors)
        .filter(filterNode)
        .map((node) => node.id);

      state.filteredPagesIDs.forEach((id) => {
        state.pages[id].isOpen = true;
      });

    default:
      return state;
  }
});

const getFilteredTree = (state) => {
  if (!state.filter) return state;

  const filterMap = (map, filteredIDs) =>
    filteredIDs.reduce((acc, val) => {
      acc[val] = map[val];
      return acc;
    }, {});

  return {
    ...state,
    anchors: filterMap(state.anchors, state.filteredAnchorsIDs),
    pages: filterMap(state.pages, state.filteredPagesIDs),
  };
};

const covnertToTree = (data, rootNodes) =>
  rootNodes.reduce((acc, val) => {
    if (!data.pages[val]) return acc;

    const node = { ...data.pages[val] };

    if (node.pages) {
      node.pages = [...covnertToTree(data, node.pages)];
    }

    if (node.isSelected && node.anchors) {
      node.anchors = node.anchors.reduce((acc, id) => {
        if (data.anchors[id]) {
          acc.push({
            ...data.anchors[id],
            type: TYPES.ANCHOR,
          });
        }
        return acc;
      }, []);
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
    filteredPages: [],
    filter: "",
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

  const setFilter = (data) =>
    dispatch({ type: TYPES.SET_FILTER, payload: data });

  const newState = covnertToTree(getFilteredTree(state), state.rootNodes);

  console.log(newState);

  return {
    tree: newState,
    setTreeState,
    selectNode,
    toggle,
    setFilter,
  };
};

export default useTree;

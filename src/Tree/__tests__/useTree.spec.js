import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useTree from "../useTree";

const initialState = {
  pages: {
    first: {
      id: "first",
      title: "First page",
      pages: ["first_child_1", "first_child_2"],
      anchors: ["first_anchor_1"],
    },
    second: {
      id: "second",
      title: "Second page",
    },
    first_child_1: {
      id: "first_child_1",
      title: "First child 1",
      pages: ["first_child_1_child_1"],
      parentId: "first",
    },
    first_child_2: {
      id: "first_child_2",
      title: "First child 2",
      parentId: "first",
    },
    first_child_1_child_1: {
      id: "first_child_1_child_1",
      title: "Child of first child of first page",
      parentId: "first_child_1",
    },
  },
  anchors: {
    first_anchor_1: {
      id: "first_anchor_1",
      title: "First anchor",
    },
  },
  rootNodes: ["first", "second"],
};

const initialTree = [
  {
    id: "first",
    title: "First page",
    type: "PAGE",
    pages: [
      {
        id: "first_child_1",
        title: "First child 1",
        type: "PAGE",
        parentId: "first",
        pages: [
          {
            id: "first_child_1_child_1",
            title: "Child of first child of first page",
            type: "PAGE",
            parentId: "first_child_1",
          },
        ],
      },
      {
        id: "first_child_2",
        title: "First child 2",
        type: "PAGE",
        parentId: "first",
      },
    ],
  },
  {
    id: "second",
    title: "Second page",
    type: "PAGE",
  },
];

describe("useTree", () => {
  test("useTree return proper data by deafult", () => {
    const { result } = renderHook(() => useTree());

    expect(result.current.tree).toEqual([]);
    expect(typeof result.current.toggle).toBe("function");
    expect(typeof result.current.setTreeState).toBe("function");
    expect(typeof result.current.selectNode).toBe("function");
    expect(typeof result.current.setFilter).toBe("function");
  });

  test("useTree convert state to the tree", () => {
    const { result } = renderHook(() => useTree(initialState));

    expect(result.current.tree).toEqual(initialTree);
  });

  test("useTree toggle miltiple node", () => {
    const { result } = renderHook(() => useTree(initialState));

    expect(result.current.tree[0].isOpen).toBe(undefined);
    expect(result.current.tree[1].isOpen).toBe(undefined);

    act(() => {
      result.current.toggle(result.current.tree[0]);
      result.current.toggle(result.current.tree[1]);
    });

    expect(result.current.tree[0].isOpen).toBe(true);
    expect(result.current.tree[1].isOpen).toBe(true);

    act(() => {
      result.current.toggle(result.current.tree[0]);
    });

    expect(result.current.tree[0].isOpen).toBe(false);
    expect(result.current.tree[1].isOpen).toBe(true);
  });

  test("useTree select node", () => {
    const { result } = renderHook(() => useTree(initialState));

    expect(result.current.tree[0].isSelected).toBe(undefined);
    expect(result.current.tree[1].isSelected).toBe(undefined);

    act(() => {
      result.current.selectNode(result.current.tree[0]);
    });
    const modifiedTree = [...initialTree];
    modifiedTree[0].isSelected = true;
    modifiedTree[0].isOpen = true;
    modifiedTree[0].anchors = [
      {
        id: "first_anchor_1",
        title: "First anchor",
        type: "ANCHOR",
      },
    ];
    expect(result.current.tree).toEqual(modifiedTree);

    act(() => {
      result.current.selectNode(result.current.tree[1]);
    });

    // select other node, should hide anchors and unselect
    expect(result.current.tree[0].anchors).toBe(undefined);
    expect(result.current.tree[0].isOpen).toBe(true);
    expect(result.current.tree[0].isSelected).toBe(false);
    expect(result.current.tree[1].isSelected).toBe(true);
  });

  test("useTree set filter for tree", () => {
    const { result } = renderHook(() => useTree(initialState));

    act(() => {
      result.current.setFilter("of");
    });

    // filter nodes, and open all parents
    expect(result.current.tree).toEqual([
      {
        id: "first",
        title: "First page",
        type: "PAGE",
        isOpen: true,
        pages: [
          {
            id: "first_child_1",
            title: "First child 1",
            type: "PAGE",
            isOpen: true,
            parentId: "first",
            pages: [
              {
                id: "first_child_1_child_1",
                title: "Child of first child of first page",
                type: "PAGE",
                isOpen: true,
                parentId: "first_child_1",
              },
            ],
          },
        ],
      },
    ]);
  });
});

# Tree Menu 🌳

Demo: [http://tree-menu-nk.surge.sh/](http://tree-menu-nk.surge.sh/)

![image](https://media.giphy.com/media/EksNwyO7niNP0JKvlm/source.gif)

## Getting started

### Install dependecies
`npm run install`

### Start Project
`npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build production assets
`npm run build`

### Run test
For unit:
`npm run test`

For e2e
`npm cypress e2e
`

## Features

- Render tree navigation menu
- Filtering
- Navigation with [TAB] and [ENTER] key.


## Animation
I didn't include the animation in this version, because natular height anumation is heavy for browser to render. 
I made some version, which work for fine, for average amount of rendered nodes. But if you type in filter input - "a", it will render a lof of nodes abd browser will suffer to animate them.

You can check demo [http://tree-item-animaton.surge.sh/#](http://tree-item-animaton.surge.sh/#)
Branch: [https://github.com/hrnik/tree-menu/tree/animation](https://github.com/hrnik/tree-menu/tree/animation)



## Project structure

```
Tree
└─── API              // helper for api call
└─── Tree             // Module for Tree component
|   |    useTree.js   // State and method to control Tree
|   |    ...
|   |    
└─── components       // Dumb components for style
│   Menu.js           // Smart component which control Tree and make Api call
|  ...

```

## Tree module

The Tree module exports: 
- the dumb **Tree** component which render the tree
- **useTree** -  it's a custom hook, which help to manage state of Tree component and provide API for actions.

```js
import Tree from "./Tree";

const tree = [
  {
    id: "id",
    title: "title page",
    type: "PAGE",
    pages: [{ id: "childId", title: "title child", type: "PAGE", pages: [] }],
    anchors: [
      {
        id: "anchorId",
        title: "title anchor",
        type: "ANCHOR",
      },
    ],
  },
];

<Tree
    data={tree}
    onToggle={node => {}}
    onSelect={node => {}}
    isLoading={isLoading}
/>

```


### useTree

 It's a custom hook, which help to manage state of Tree component and provide API for actions.


```js
const { tree, selectNode, toggle, setTreeState, setFilter } = useTree();
```

**Return:**

`tree` - Hierarhical represantation of tree data

Actions:

`setTreeState(FLAT_TREE)` - 
Set tree state. It's receiving a flat tree structure and converts it to hierarchical data.
```js
  const FLAT_TREE = {
    pages: {
      [id]: {
        title:"",
        parentId:"",
        parents:[""],
        anchors:[""],
      }
    }
    anchors: {
      [id]: {
        title: "",
      }
    },
    rootNodes: [""]
  }
```

`selectNode(Node)` - Select Node

`toggle(Node)`  - Toggle node

`setFilter(string)` -  Set fitler

import { useEffect, useState } from "react";
import { getTOCs } from "./API";
import Tree, { useTree } from "./Tree";

const TreeContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { tree, selectNode, toggle, setTreeState } = useTree();

  useEffect(async () => {
    setIsLoading(true);
    const TOCs = await getTOCs();
    setTreeState(TOCs);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Tree
        data={tree}
        onToggle={toggle}
        onSelect={selectNode}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TreeContainer;

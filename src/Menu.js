import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { getTOCs } from "./API";
import Tree, { useTree } from "./Tree";
import Input from "./components/Input";

const TreeContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setMenuFilter] = useState("");
  const { tree, selectNode, toggle, setTreeState, setFilter } = useTree();

  useEffect(async () => {
    setIsLoading(true);
    const TOCs = await getTOCs();
    setTreeState(TOCs);
    setIsLoading(false);
  }, []);

  const onDebounce = useCallback(
    debounce((nextValue) => {
      console.log(nextValue);
      setIsLoading(false);
      setFilter(nextValue);
    }, 800),
    []
  );

  return (
    <div>
      <Input
        onChange={setMenuFilter}
        onChange={(e) => {
          setIsLoading(true);
          setMenuFilter(e.target.value);
          onDebounce(e.target.value);
        }}
      />
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

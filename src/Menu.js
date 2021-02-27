import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { getTOCs } from "./API";
import Tree, { useTree } from "./Tree";
import Input from "./components/Input";

const MenuContainer = styled.div`
  padding-top: 16px;
`;

const InputContainer = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  margin-bottom: 8px;
`;

const TreeContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setMenuFilter] = useState("");
  const { tree, selectNode, toggle, setTreeState, setFilter } = useTree();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const TOCs = await getTOCs();
      setTreeState(TOCs);
      setIsLoading(false);
    };

    fetchData();
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
    <MenuContainer>
      <InputContainer>
        <Input
          placeholder="Filter..."
          onChange={(e) => {
            setIsLoading(true);
            setMenuFilter(e.target.value);
            onDebounce(e.target.value);
          }}
        />
      </InputContainer>
      <Tree
        data={tree}
        onToggle={toggle}
        onSelect={selectNode}
        isLoading={isLoading}
      />
    </MenuContainer>
  );
};

export default TreeContainer;

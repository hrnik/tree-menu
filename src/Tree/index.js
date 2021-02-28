import TreeItem from "./components/TreeItem";
import Skeleton from "./components/Skeleton";

export { default as useTree } from "./useTree";

const Tree = ({ data, onToggle, onSelect, isLoading }) => {
  if (isLoading) return <Skeleton />;

  return data.map((item) => (
    <TreeItem
      item={item}
      onToggle={onToggle}
      onSelect={onSelect}
      key={item.id}
      level={0}
    />
  ));
};

export default Tree;

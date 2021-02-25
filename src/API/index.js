export const getTOCs = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/TOC.json`);
  const data = await response.json();
  return {
    pages: data.entities.pages,
    anchors: data.entities.anchors,
    rootNodes: data.topLevelIds,
  };
};

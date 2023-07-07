interface NodeProps {
  node: WarNode,
  onClickHandler?: () => void;
}

const GRID_SIZE = 100;

const Grid: React.FC<NodeProps> = ({node, onClickHandler}: NodeProps) => {
  const nodeStyle = {
    backgroundColor: node.color
  };

  return (
    <div
      id="node"
      style={nodeStyle}
      className="node"
      onClick={onClickHandler}
    >

    </div>
  )
};
  
export default Grid;

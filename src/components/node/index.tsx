import classes from './node.module.css';

interface NodeProps {
  node: WarNode,
  onClickHandler?: () => void;
}

const Grid: React.FC<NodeProps> = ({node, onClickHandler}: NodeProps) => {
  const nodeStyle = {
    backgroundColor: node.color
  };

  return (
    <div className={classes.tooltipContainer}>
      <div
        id="node"
        style={nodeStyle}
        className={`node ${classes.tooltipTrigger}`}
        onClick={onClickHandler}
      />
      <div className={classes.tooltipOne}>
        {(`(${node.x}, ${node.y})`) + (node.message ? `: ${node.message}` : '')}
      </div>

    </div>
  )
};
  
export default Grid;

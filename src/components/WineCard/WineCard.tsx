import { useDrag, DragSourceMonitor } from 'react-dnd';

interface WineCardProps {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DragItem {
  type: string;
  id: string;
}

interface DragResult {
  isDragging: boolean;
}

const WineCard: React.FC<WineCardProps> = ({
  id,
  name,
  x,
  y,
  width,
  height,
}) => {
  const [{ isDragging }, drag] = useDrag<DragItem, any, DragResult>({type: 'wine', collect: (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() })});
    

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        background: 'white',
        border: '1px solid black',
      }}
    >
      <div style={{ padding: 10 }}>{name}</div>
    </div>
  );
};

export default WineCard;

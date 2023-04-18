import { useState } from 'react';
import { fabric } from 'fabric';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WineCard from '@/components/WineCard/WineCard';

const WineMenu: React.FC = () => {
  const [cards, setCards] = useState([
    { id: '1', name: 'Wine 1', x: 50, y: 50, width: 150, height: 200 },
    { id: '2', name: 'Wine 2', x: 250, y: 50, width: 150, height: 200 },
    { id: '3', name: 'Wine 3', x: 450, y: 50, width: 150, height: 200 },
  ]);

  const handleDrop = (e: any) => {
    const card = cards.find((c) => c.id === e.id);
    if (card) {
      card.x = e.x;
      card.y = e.y;
      setCards([...cards]);
    }
  };

  const renderCards = () => {
    return cards.map((card) => (
      <WineCard key={card.id} {...card} />
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          position: 'relative',
          width: '600px',
          height: '800px',
          background: 'lightgray',
          margin: '0 auto',
        }}
      >
        {renderCards()}
      </div>
    </DndProvider>
  );
};

export default WineMenu;

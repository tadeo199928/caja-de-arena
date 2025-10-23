// DragItem.tsx
import { useRef } from 'react'; 
import Draggable from 'react-draggable';

function MyDraggableComponent() {
  const nodeRef = useRef(); 

  

  return (
 
    
    <Draggable nodeRef={nodeRef} bounds="parent">
        
      <div ref={nodeRef} style={{ border: '2px solid red', width: '100px', height: '100px', }}>
        <img 
          src="https://www.meisterdrucke.uk/kunstwerke/1260px/Baccio%20del%20Bianco%20-%20Bacchus%20-%20%28MeisterDrucke-639570%29.jpg" 
          alt="placeholder" 
          draggable="false" 
          style={{ width: '100%' }} // Example style
        />
        <div>Mueveme</div>
      </div>
    </Draggable>
  );
}

export default MyDraggableComponent;
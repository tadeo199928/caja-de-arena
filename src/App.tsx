
import MyDraggableComponent from "./DragElement/DragElement";
import { imgOfGods } from "./DragElement/ImgFinder";
import "./App.css";

function App() {
  return (
    <div className=" w-screen h-screen bg-sand">
      {imgOfGods.map((god) => (
        <MyDraggableComponent key={god.id} img={god.img} />
      ))}
    </div>
  );
}

export default App;

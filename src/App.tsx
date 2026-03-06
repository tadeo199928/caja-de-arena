
 import MyDraggableComponent from "./DragElement/DragElement";
// import { imgOfGods } from "./DragElement/ImgFinder";
import "./App.css";

function App() {
  return (
    <div className="full-screen">
      {/* {imgOfGods.map((god) => ( */}
        {/* <MyDraggableComponent key={god.id} img={god.img} /> */}
      {/* ))} */}
      <MyDraggableComponent  key="image1" img="/images/image1.jpg" />
      <MyDraggableComponent  key="image2" img="/images/image2.jpg" />
    </div>
  );
}

export default App;

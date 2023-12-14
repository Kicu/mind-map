import "./App.css";
import { D3TestMap } from "./components/D3TestMap";
import { D3RadialMap } from "./components/D3RadialMap";

function App() {
  return (
    <div>
      <D3RadialMap />
      <D3TestMap />
    </div>
  );
}

export default App;

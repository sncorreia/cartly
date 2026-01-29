import Navbar from "./components/Navbar";
import ItemList from "./components/ItemList";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline /> {/* Removes default browser margins */}
      <Navbar />
      <ItemList />
    </>
  );
}

export default App;

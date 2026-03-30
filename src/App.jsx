import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Entrance from './containers/Entrance';
import Heritage from './containers/Heritage/heritage';
import Cellar from './containers/Cellar/cellar';
import Masterpiece from './containers/Masterpiece/masterpiece';
import Latelier from './containers/Checkout/latelier';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/entrance" element={<Entrance />} />
        <Route path="/cellar" element={<Cellar />} />
        <Route path="/masterpiece" element={<Masterpiece />} />
        <Route path="/latelier" element={<Latelier />} />
      </Routes>
    </Router>
  );
}

export default App
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import './index.css';
import 'ol/ol.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

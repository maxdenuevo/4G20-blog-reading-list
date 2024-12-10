import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navigation } from './components/Navbar';
import Characters from './pages/Characters';
import Vehicles from './pages/Vehicles';
import Planets from './pages/Planets';
import Favorites from './pages/Favorites';
import Details from './pages/Details';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navigation />
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/:type/:id" element={<Details />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

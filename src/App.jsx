import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home';
import Bug from './pages/bug';
import CodeSmell from './pages/codesmell';
import Vulnerabilities from './pages/vulnerabilities';
import TechnicalDebt from './pages/technicaldebt';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bug" element={<Bug />} />
          <Route path="/codesmell" element={<CodeSmell />} />
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/technicaldebt" element={<TechnicalDebt />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

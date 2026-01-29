import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './views/Home';
import Layout from './views/Layout';
import DetectFace from './views/DetectFace';
import { useStore } from './stores/DBStore';
import { useEffect } from 'react';
import Detected from './views/Detected';
import DetectGesture from './views/DetectGesture';

function App() {
  const { init } = useStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/face" element={<DetectFace />} />
          <Route path="/detected" element={<Detected />} />
          <Route path="/gesture/:label" element={<DetectGesture />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

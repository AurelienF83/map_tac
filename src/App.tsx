import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import Files from "./pages/Files";
import Inter from "./pages/Inter";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Files />} />
          <Route path="/inter" element={<Inter />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

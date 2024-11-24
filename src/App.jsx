import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Countries from "./components/Countries";
import Details from "./components/Details";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/">
              <Route index element={<Countries />} />
              <Route path="countries">
                <Route index element={<Countries />} />
                <Route path=":cca2" element={<Details />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

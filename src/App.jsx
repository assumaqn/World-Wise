import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayOut from "./pages/AppLayOut";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayOut />}>
          <Route index element={<p>List of cities</p>} />
          <Route path="cities" element={<p>List of cities</p>} />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form for the cities</p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

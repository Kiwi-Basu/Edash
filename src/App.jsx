import { BrowserRouter , Routes, Route } from "react-router";

import DashboardLayout from "./layout/DashboardLayout";

import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Blogs from "./pages/Blogs";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <>
      <section id="App">
        <div>
          <BrowserRouter>
            <Routes>
              <Route element={ <DashboardLayout/>} >
                <Route path="/" element={<Products/>} />
                <Route path="/customers" element={<Customers/>} />
                <Route path="/blogs" element={<Blogs/>} />
                <Route path="/orders" element={<Orders/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </section>
    </>
  )
}

export default App
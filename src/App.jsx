import { BrowserRouter , Routes, Route } from "react-router";

import DashboardLayout from "./layout/DashboardLayout";

import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Blogs from "./pages/Blogs";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";

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
                <Route path="/users" element={<Users/>} />
                <Route path="/categories" element={<Categories/>} />
                <Route path="/categories/:name" element={<CategoryProducts/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </section>
    </>
  )
}

export default App
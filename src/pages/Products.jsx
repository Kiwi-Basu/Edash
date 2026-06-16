import { useState } from "react";
import productsData from "../data/productData.json";
import { Plus , Pencil , Trash2 , Search } from "lucide-react";

const Products = () => {
  const [selectedProduct,setSelectedProduct] = useState(null)
  const [editOpen,setEditOpen] = useState(null)
  const [deleteProduct,setDeleteProduct] = useState(null)
  const [confirmDelete,setConfirmDelete] = useState(null)
  
  return ( 
  <section className="p-8">

    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold">Products</h1>
        <p className="text-gray-500">Manage your store inventory</p>
      </div>

      <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-black/90 transition-all">
        <Plus size={18} />
        Add Product
      </button>
    </div>
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-2xl border p-5">
        <p className="text-gray-500">Total Products</p>
        <h2 className="text-3xl font-bold">{productsData.length}</h2>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <p className="text-green-700">In Stock</p>
        <h2 className="text-3xl font-bold">{productsData.filter(product => product.stock > 10).length}</h2>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <p className="text-yellow-700">Low Stock</p>
        <h2 className="text-3xl font-bold">{productsData.filter(product => product.stock > 0 && product.stock <= 10).length}</h2>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <p className="text-red-700">Out Of Stock</p>
        <h2 className="text-3xl font-bold">{productsData.filter(product => product.stock === 0).length}</h2>
      </div>

    </div>

    <div className="mb-8">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
        <input type="text" placeholder="Search product..." className=" w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black/10"/>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {productsData.map((product) => (
        <div key={product.id} className="bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
          <img src={product.image} alt={product.name}
            className="w-full h-52 object-cover "/>

          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-500">{product.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? "bg-green-100 text-green-700" : product.stock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out Of Stock"}</span>
            </div>
            <div className="space-y-2 mb-5">
              <p><span className="font-semibold">Price:</span>{" "}₹{product.price}</p>
              <p><span className="font-semibold">Stock:</span>{" "}{product.stock}</p>
              <p><span className="font-semibold">SKU:</span>{" "}{product.sku}</p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => {setSelectedProduct(product);setEditOpen(true)}}><Pencil size={16} />Edit</button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => {setSelectedProduct(product);setDeleteProduct(true)}}><Trash2 size={16} />Delete</button>
            </div>

          </div>

        </div>
      ))}

    </div>
    {editOpen && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

        <div className="w-[600px] bg-white rounded-2xl shadow-2xl p-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">
              Edit Product
            </h2>

            <button
              onClick={() => setEditOpen(false)}
              className="text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">

            <input type="file" name="" id="" />

            <input
              type="text"
              placeholder="Product Name"
              defaultValue={selectedProduct.name}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              placeholder="Price"
              defaultValue={selectedProduct.price}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              placeholder="Stock"
              defaultValue={selectedProduct.stock}
              className="w-full border rounded-xl p-3"
            />

            <button
              className="
                w-full
                bg-black
                text-white
                py-3
                rounded-xl
              "
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>
    )}
    {deleteProduct && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

        <div className="w-[600px] bg-white rounded-2xl shadow-2xl p-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">
              Edit Product
            </h2>

            <button
              onClick={() => setDeleteProduct(false)}
              className="text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <input type="file" name="" id="" />
            <input disabled placeholder="Product Name" defaultValue={selectedProduct.name} className="w-full border rounded-xl p-3"/>
            <input disabled placeholder="Price" defaultValue={selectedProduct.price} className="w-full border rounded-xl p-3"/>
            <input disabled placeholder="Stock" defaultValue={selectedProduct.stock} className="w-full border rounded-xl p-3"/>
            <button className="w-full bg-black text-white py-3 rounded-xl cursor-pointer" onClick={()=> {setConfirmDelete(true)}}>Delete</button>
          </div>
        </div>
      </div>
    )}
    {confirmDelete && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="w-[600px] bg-white rounded-2xl shadow-2xl p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Are You Sure
          </h2>
          <button onClick={() => setConfirmDelete(false)} className="text-xl">✕</button>
        </div>

        <div className="flex justify-evenly w-full">
          <button className="border px-15 py-3 rounded-xl border-black/20 shadow cursor-pointer bg-red-500 hover:scale-105 transition-all duration-300">Yes</button>
          <button className="border px-15 py-3 rounded-xl border-black/20 shadow cursor-pointer  hover:scale-105 transition-all duration-300">No</button>
        </div>
      </div>
    </div>
    )}
</section>


);
};

export default Products;

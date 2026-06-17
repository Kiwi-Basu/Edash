import { useState , useMemo } from "react";
import productsData from "../data/productData.json";

const Products = () => {
  const [list, setList] = useState(productsData)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [view, setView] = useState(null)
  const [edit, setEdit] = useState(null)
  const [editPreview, setEditPreview] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [preview, setPreview] = useState(null)
  const [addForm, setAddForm] = useState({ name: '', price: '', stock: '', description: '' })
  const itemsPerPage = 10

  const handleEditChange = (e) => {
    const { name, value } = e.target
    if (name === 'stock' && value !== '' && !/^\d+$/.test(value)) return
    if (name === 'price' && value !== '' && !/^\d*\.?\d*$/.test(value)) return
    setEdit(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveEdit = () => {
    setList(prev => prev.map(p => p.id === edit.id ? edit : p))
    setEdit(null)
    setEditPreview(null)
  }

  const handleAddChange = (e) => {
    const { name, value } = e.target
    if (name === 'stock' && value !== '' && !/^\d+$/.test(value)) return
    if (name === 'price' && value !== '' && !/^\d*\.?\d*$/.test(value)) return
    setAddForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = () => {
    const newProduct = {
      id: `#${Date.now()}`,
      name: addForm.name,
      price: parseFloat(addForm.price) || 0,
      stock: parseInt(addForm.stock) || 0,
      description: addForm.description,
      image: preview || 'https://via.placeholder.com/400',
      status: 'Active'
    }
    setList(prev => [newProduct, ...prev])
    setAddOpen(false)
    setPreview(null)
    setAddForm({ name: '', price: '', stock: '', description: '' })
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }, [search, list])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, page])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleDelete = () => {
    setList(prev => prev.filter(p => p.id !== deleteId))
    setDeleteId(null)
  }
  return (
    <div className ="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >+ Add Product</button>
      </div>

      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search products by name, ID, or description..."
          className="w-full bg-white/3 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {paginated.map(p => (
          <div key={p.id} className="bg-white/3 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all group">
            <div className="h-48 overflow-hidden bg-gray-800/50 cursor-pointer" onClick={() => setView(p)}>
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-sm truncate cursor-pointer  transition-colors" onClick={() => setView(p)}>{p.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-white">${p.price}</span>
                <span className={`text-xs font-medium ${p.stock === 0 ? 'text-red-500' : p.stock < 10 ? 'text-yellow-500' : 'text-gray-400'}`}>{p.stock} in stock</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setEdit(p)} className="flex-1 px-3 py-1.5 text-xs border border-white/10 text-gray-300 rounded-lg  hover:text-white hover:scale-105 transition-all cursor-pointer">Edit</button>
                <button onClick={() => setDeleteId(p.id)} className="flex-1 px-3 py-1.5 text-xs border border-white/10 text-red-400 rounded-lg hover:border-red-500/50 hover:scale-105 hover:text-red-300 transition-all cursor-pointer">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paginated.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-gray-500">No products found matching your search.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-10 h-10 text-sm rounded-lg font-medium transition-colors cursor-pointer ${
                n === page
                  ? 'bg-primary text-white'
                  : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >{n}</button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >Next</button>
        </div>
      )}

      {/* View Modal */}
      {view && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setView(null)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">Product Details</h2>
              <button onClick={() => setView(null)} className="text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 rounded-xl overflow-hidden bg-gray-800/50">
                <img src={view.image} alt={view.name} className="w-full h-64 md:h-full object-cover" />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Product ID</p>
                  <p className="text-white font-mono text-sm">{view.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                  <p className="text-white font-semibold text-lg">{view.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Description</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{view.description}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
                    <p className="text-2xl font-bold text-white">${view.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Stock</p>
                    <p className={`text-2xl font-bold ${view.stock === 0 ? 'text-red-500' : 'text-green-500'}`}>{view.stock}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                    view.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                    view.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>{view.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {edit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => { setEdit(null); setEditPreview(null) }}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">Edit: {edit.name}</h2>
              <button onClick={() => { setEdit(null); setEditPreview(null) }} className="text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            </div>
            <div className="space-y-5">
              <div className="flex gap-6">
                <div className="w-40 h-40 rounded-xl overflow-hidden bg-gray-800 shrink-0 relative group cursor-pointer">
                  <label className="block w-full h-full cursor-pointer">
                    <img src={editPreview || edit.image} alt={edit.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <span className="text-white text-sm font-medium">Change</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) setEditPreview(URL.createObjectURL(file))
                      }}
                    />
                  </label>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Name</label>
                    <input name="name" value={edit.name} onChange={handleEditChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Price</label>
                      <input name="price" value={edit.price} onChange={handleEditChange} type="text" inputMode="decimal" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Stock</label>
                      <input name="stock" value={edit.stock} onChange={handleEditChange} type="text" inputMode="numeric" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                <textarea name="description" value={edit.description} onChange={handleEditChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50 resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => { setEdit(null); setEditPreview(null) }} className="px-5 py-2 text-sm text-gray-400 border border-white/10 rounded-lg hover:text-white transition-colors cursor-pointer">Cancel</button>
                <button onClick={handleSaveEdit} className="px-5 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors cursor-pointer">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setDeleteId(null)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">Confirm Delete</h2>
              <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            </div>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2 text-sm text-gray-400 border border-white/10 rounded-lg hover:text-white transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-5 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {addOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => { setAddOpen(false); setPreview(null) }}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">Add New Product</h2>
              <button onClick={() => { setAddOpen(false); setPreview(null) }} className="text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            </div>
            <div className="flex gap-6">
              <div className="w-56 shrink-0">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Image Preview</label>
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-800/50 border border-white/10 flex items-center justify-center relative cursor-pointer">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-600 text-3xl">📷</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) setPreview(URL.createObjectURL(file))
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Product Name</label>
                  <input name="name" value={addForm.name} onChange={handleAddChange} placeholder="Enter product name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Price</label>
                    <input name="price" value={addForm.price} onChange={handleAddChange} type="text" inputMode="decimal" placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Stock</label>
                    <input name="stock" value={addForm.stock} onChange={handleAddChange} type="text" inputMode="numeric" placeholder="0" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                  <textarea name="description" value={addForm.description} onChange={handleAddChange} rows={4} placeholder="Enter product description" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50 resize-none" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => { setAddOpen(false); setPreview(null); setAddForm({ name: '', price: '', stock: '', description: '' }) }} className="px-5 py-2 text-sm text-gray-400 border border-white/10 rounded-lg hover:text-white transition-colors cursor-pointer">Cancel</button>
                  <button onClick={handleAddProduct} className="px-5 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors cursor-pointer">Add Product</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default Products;

import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router'
import products from '../data/productData.json'

export default function CategoryProducts() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [list] = useState(products)
  const [view, setView] = useState(null)

  const filtered = useMemo(() => {
    return list.filter(p => p.category === name)
  }, [list, name])

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors text-xl cursor-pointer">&larr;</button>
          <div>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-sm text-gray-500 mt-1">{filtered.length} products in this category</p>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all group cursor-pointer" onClick={() => setView(p)}>
              <div className="h-48 overflow-hidden bg-gray-800/50">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm truncate">{p.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-white">${p.price}</span>
                  <span className={`text-xs font-medium ${p.stock === 0 ? 'text-red-500' : p.stock < 10 ? 'text-yellow-500' : 'text-gray-400'}`}>{p.stock} in stock</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={(e) => { e.stopPropagation(); setView(p) }} className="flex-1 px-3 py-1.5 text-xs border border-white/10 text-gray-300 rounded-lg hover:border-primary/50 hover:text-primary transition-all cursor-pointer">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setView(null)}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-lg font-semibold text-white">{view.name}</h3>
              <button onClick={() => setView(null)} className="text-gray-500 hover:text-white transition-colors text-xl leading-none cursor-pointer">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden bg-gray-800/50">
                  <img src={view.image} alt={view.name} className="w-full h-64 object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Product ID</p>
                    <p className="text-white font-mono text-sm">{view.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Category</p>
                    <p className="text-white">{view.category}</p>
                  </div>
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
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Description</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{view.description}</p>
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
    </div>
  )
}
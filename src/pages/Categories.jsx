import { useState } from 'react'
import { useNavigate } from 'react-router'
import categories from '../data/categoryData.json'
import products from '../data/productData.json'

export default function Categories() {
  const navigate = useNavigate()
  const [list] = useState(categories)

  const stats = [
    { label: 'Total Categories', value: list.length },
    { label: 'Total Products', value: products.length },
  ]

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Browse products by category</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white/3 border border-white/5 rounded-xl p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {list.map(c => {
          const productCount = products.filter(p => p.category === c.name).length
          return (
            <div
              key={c.id}
              onClick={() => navigate(`/categories/${encodeURIComponent(c.name)}`)}
              className="bg-white/3 border border-white/5 rounded-xl p-5 hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{c.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold group-hover:text-primary transition-colors">{c.name}</h3>
                  <p className="text-xs text-gray-500">{productCount} products</p>
                </div>
                <span className="text-gray-500 group-hover:text-white transition-colors">&rarr;</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.subcategories.slice(0, 4).map(s => (
                  <span key={s} className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-gray-400">{s}</span>
                ))}
                {c.subcategories.length > 4 && (
                  <span className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-gray-500">+{c.subcategories.length - 4}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
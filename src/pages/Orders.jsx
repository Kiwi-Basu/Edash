import { useState } from 'react'
import orders from '../data/orderData.json'

export default function Orders() {
  const [list] = useState(orders)
  const [view, setView] = useState(null)

  const statusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/10 text-green-500'
      case 'Shipped': return 'bg-blue-500/10 text-blue-500'
      case 'Processing': return 'bg-yellow-500/10 text-yellow-500'
      case 'Cancelled': return 'bg-red-500/10 text-red-500'
      default: return 'bg-gray-500/10 text-gray-400'
    }
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Orders</h2>
          <p className="text-sm text-gray-500 mt-1">Track and manage customer orders</p>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-white/[0.05] text-xs text-gray-500 uppercase tracking-wider font-medium">
          <p>Order ID</p>
          <p>Customer</p>
          <p>Items</p>
          <p>Total</p>
          <p>Date</p>
          <p>Status</p>
        </div>
        {list.map(o => (
          <div key={o.id} className="grid grid-cols-6 gap-4 px-4 py-3 border-t border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer" onClick={() => setView(o)}>
            <p className="text-white font-mono text-sm">{o.id}</p>
            <p className="text-white text-sm">{o.customer}</p>
            <p className="text-gray-400 text-sm">{o.items}</p>
            <p className="text-white font-medium text-sm">${o.total.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">{o.date}</p>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium w-fit ${statusColor(o.status)}`}>{o.status}</span>
          </div>
        ))}
      </div>

      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setView(null)}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-lg font-semibold text-white">{view.id}</h3>
              <button onClick={() => setView(null)} className="text-gray-500 hover:text-white transition-colors text-xl leading-none cursor-pointer">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Customer</p>
                    <p className="text-white font-medium text-lg">{view.customer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(view.status)}`}>{view.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Items</p>
                    <p className="text-white text-2xl font-bold">{view.items}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
                    <p className="text-white text-2xl font-bold">${view.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                    <p className="text-white">{view.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Products</p>
                  <div className="flex flex-wrap gap-2">
                    {view.products.map(p => (
                      <span key={p} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
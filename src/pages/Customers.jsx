import { useState } from 'react'
import customers from '../data/customersData.json'

export default function Customers() {
  const [list] = useState(customers)
  const [view, setView] = useState(null)

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Customers</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage your customers</p>
        </div>
        <button className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">Export List</button>
      </div>

      <div className="grid gap-4">
        {list.map(c => (
          <div key={c.id} className="bg-white/3 border border-white/5 rounded-xl p-5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setView(c)}>
            <div className="flex items-center gap-4">
              <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full bg-gray-700" />
              <div className="flex-1">
                <p className="text-white font-medium">{c.name}</p>
                <p className="text-xs text-gray-500">{c.email}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">${c.spent.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{c.orders} orders</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                <div className="flex items-center gap-5">
                  <img src={view.avatar} alt={view.name} className="w-16 h-16 rounded-full bg-gray-700" />
                  <div>
                    <p className="text-xl font-bold text-white">{view.name}</p>
                    <p className="text-sm text-gray-400">{view.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Customer ID</p>
                    <p className="text-white font-mono text-sm">{view.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                    <p className="text-white">{view.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">City</p>
                    <p className="text-white">{view.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Joined</p>
                    <p className="text-white">{view.joined}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Orders</p>
                    <p className="text-2xl font-bold text-white">{view.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Spent</p>
                    <p className="text-2xl font-bold text-white">${view.spent.toLocaleString()}</p>
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
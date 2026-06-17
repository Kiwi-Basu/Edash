import { useState } from 'react'
import users from '../data/userData.json'

const NOW = Date.now()

export default function Users() {
  const [list] = useState(users)
  const [view, setView] = useState(null)

  const timeAgo = (iso) => {
    if (!iso) return 'N/A'
    const diff = NOW - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins} min ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
    return `${Math.floor(hrs / 24)} days ago`
  }

  return (
    <section id='Users'>
      <div className='p-5'>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Users</h2>
            <p className="text-sm text-gray-500 mt-1">Manage team members and their permissions</p>
          </div>
          <button className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">+ Invite User</button>
        </div>
        <div className="grid gap-4">
          {list.map(u => (
            <div key={u.id} className="bg-white/3 border border-white/5 rounded-xl p-5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setView(u)}>
              <div className="flex items-center gap-4">
                <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full bg-gray-700" />
                <div className="flex-1">
                  <p className="text-white font-medium">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email} · {u.department}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    u.role === 'Super Admin' ? 'bg-purple-500/10 text-purple-500' :
                    u.role === 'Manager' ? 'bg-blue-500/10 text-blue-500' :
                    u.role === 'Editor' ? 'bg-green-500/10 text-green-500' :
                    u.role === 'Support' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>{u.role}</span>
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
                <h3 className="text-lg font-semibold text-white">{view?.name}</h3>
                <button onClick={() => setView(null)} className="text-gray-500 hover:text-white transition-colors text-xl leading-none cursor-pointer">&times;</button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                {view && (
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
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Role</p>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                          view.role === 'Super Admin' ? 'bg-purple-500/10 text-purple-500' :
                          view.role === 'Manager' ? 'bg-blue-500/10 text-blue-500' :
                          view.role === 'Editor' ? 'bg-green-500/10 text-green-500' :
                          view.role === 'Support' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-gray-500/10 text-gray-400'
                        }`}>{view.role}</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-2 h-2 rounded-full ${view.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-white">{view.status}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Department</p>
                        <p className="text-white">{view.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Last Active</p>
                        <p className="text-white">{timeAgo(view.lastActive)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-2">
                        {view.permissions.map(p => (
                          <span key={p} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  )
}

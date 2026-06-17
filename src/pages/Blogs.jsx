import { useState } from 'react'
import blogs from '../data/blogData.json'

export default function Blogs() {
  const [list] = useState(blogs)
  const [view, setView] = useState(null)

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Blogs</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your blog posts</p>
        </div>
        <button className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">+ New Post</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {list.map(b => (
          <div key={b.id} className="bg-white/3 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all group cursor-pointer" onClick={() => setView(b)}>
            <div className="h-44 overflow-hidden bg-gray-800/50">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-medium">{b.category}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  b.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>{b.status}</span>
              </div>
              <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{b.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{b.excerpt}</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={b.authorAvatar} alt={b.author} className="w-6 h-6 rounded-full bg-gray-700" />
                <span className="text-xs text-gray-400 flex-1">{b.author}</span>
                <span className="text-xs text-gray-500">{b.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setView(null)}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-3xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-lg font-semibold text-white">{view.title}</h3>
              <button onClick={() => setView(null)} className="text-gray-500 hover:text-white transition-colors text-xl leading-none cursor-pointer">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden bg-gray-800/50">
                  <img src={view.image} alt={view.title} className="w-full h-64 object-cover" />
                </div>
                <div className="flex items-center gap-4">
                  <img src={view.authorAvatar} alt={view.author} className="w-10 h-10 rounded-full bg-gray-700" />
                  <div>
                    <p className="text-white font-medium">{view.author}</p>
                    <p className="text-xs text-gray-500">{view.date} · {view.views.toLocaleString()} views · {view.comments} comments</p>
                  </div>
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                    view.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>{view.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Post ID</p>
                    <p className="text-white font-mono text-sm">{view.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Category</p>
                    <p className="text-white">{view.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Published</p>
                    <p className="text-white">{view.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Comments</p>
                    <p className="text-white">{view.comments}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Content</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{view.excerpt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
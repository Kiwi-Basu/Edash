import { ShoppingCart, User, CircleUser, NotebookPen, Target, Van, ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapse, setCollapse] = useState(false)

  const menuItems = [
    { name: 'Products', icon: ShoppingCart, link: '/' },
    { name: 'Customers', icon: User, link: '/customers' },
    { name: 'Blogs', icon: NotebookPen, link: '/blogs' },
    { name: 'Category', icon: Target, link: '/categories' },
    { name: 'Orders', icon: Van, link: '/orders' },
    { name: 'Users', icon: CircleUser, link: '/users' },
  ]

  const isActive = (link) => {
    if (link === '/') return location.pathname === '/'
    return location.pathname.startsWith(link)
  }

  return (
    <>
      <section id="sidebar">
        <div className="border-r border-white/5 bg-sidebar text-white sticky top-0 w-max min-h-screen flex flex-col justify-start p-5 gap-8">
          <div className="flex items-center justify-between w-full">
            <img src="./favicon.svg" alt="logo" className="h-10 w-10" />
            <button
              onClick={() => setCollapse(!collapse)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {collapse ? <ArrowRightToLine size={20} /> : <ArrowLeftToLine size={20} />}
            </button>
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
            {menuItems.map((menu, i) => {
              const Icons = menu.icon
              const active = isActive(menu.link)
              return (
                <button
                  key={i}
                  onClick={() => navigate(menu.link)}
                  className={`flex items-center gap-3 w-full rounded-lg transition-all duration-300 cursor-pointer ${
                    collapse ? 'justify-center px-2 py-2' : 'px-4 py-2.5'
                  } ${
                    active
                      ? 'bg-blue-500/20 text-primary'
                      : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'
                  }`}
                >
                  <Icons size={20} />
                  {!collapse && <span className="text-sm font-medium whitespace-nowrap">{menu.name}</span>}
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Sidebar
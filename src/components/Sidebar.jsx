import { ShoppingCart , User , CircleUser , NotebookPen , Target , Van , Cuboid , ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
const Sidebar = () => {
  const navigate = useNavigate()
  const menuItems = [
    { name: "Products", icon: ShoppingCart, link : "/"},
    { name: "Customers", icon: User, link : "/customers" },
    { name: "Blogs", icon: NotebookPen, link : "/blogs" },
    { name: "Category", icon: Target, link : "/" },
    { name: "Orders", icon: Van, link : "/orders" },
    { name: "Users",icon: CircleUser, link : "/" },
    { name: "Stock", icon: Cuboid, link : "/" },
  ]
  const [collapse,setCollapse] = useState(false)
  return (
    <>
      <section id="sidebar">
        <div className="border-r  w-max min-h-screen flex flex-col justify-evenly p-5 gap-2">
          <div className='flex items-center justify-between w-full'>
            <img src="./favicon.svg" alt="logo" className='h-10 w-10 ' />
            {collapse ? <ArrowRightToLine className='h-10 w-10 ' onClick={() => {setCollapse(!collapse)}} /> : <ArrowLeftToLine className='h-10 w-10 ' onClick={() => {setCollapse(!collapse)}} /> }
          </div>
          <div className='flex flex-col items-start justify-center gap-5 '>
            {menuItems.map((menu,i) => {
              const Icons = menu.icon
              return (      
                  <button onClick={()=> {navigate(menu.link)}} key={i} className={`border border-black/20 ${collapse ? "px-2 justify-center" : "px-10"} py-2 rounded-lg shadow-2xl  w-full cursor-pointer hover:bg-black/10 transition-all duration-300 flex gap-3`}><Icons />{!collapse &&  menu.name}</button>
                )})}
          </div>
          
          
        </div>
      </section>
    </>
  )
}

export default Sidebar
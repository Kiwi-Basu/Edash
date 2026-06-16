import { Outlet } from "react-router"
import Sidebar from "../components/Sidebar"

const DashboardLayout = () => {
  return (
    <>
      <section id="dashboard-layout">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        
        </div>
      </section>
    </>
  )
}

export default DashboardLayout
import { useState } from "react";
import customerData from "../data/customersData.json";
import { ChevronLast , ChevronFirst , ChevronRight , ChevronLeft} from 'lucide-react'
const Customers = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const visible = 5

  const totalPages = Math.ceil(customerData.length/visible)
  const startIndex = (currentPage - 1) * visible
  const currentCustomers = customerData.slice(startIndex,startIndex + visible)

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <section className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-gray-500">
          Manage and view customer information
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-black/15 overflow-hidden">

        <div className="flex items-center justify-between p-5 border-b ">
          <h2 className="font-semibold text-lg">
            Customer List
          </h2>

          <input
            type="text"
            placeholder="Search customer..."
            className="border border-black/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 gap-4 p-4 bg-gray-100 font-semibold text-sm">
            <p>ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Phone</p>
            <p>Address</p>
            <p>Orders</p>
            <p>Spent</p>
            <p>Status</p>
          </div>
          {currentCustomers.map((customer) => (
            <div key={customer.id} className="grid grid-cols-8 gap-5 px-4 py-2 border-t hover:bg-gray-50 transition-all ">
              <p>#{customer.id}</p>

              <p className="font-medium">{customer.name}</p>

              <p className="">{customer.email}</p>

              <p>{customer.phone}</p>

              <p className="">{customer.address}</p>

              <p>{customer.totalOrders}</p>

              <p className="font-medium">₹{customer.totalSpent}</p>

              <span className={`w-fit h-fit px-2 rounded-full py-0.5  text-sm font-medium ${ customer.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`}>
                {customer.status}
              </span>
            </div>
          ))}

        </div>
      <div className="flex items-center justify-center gap-2 p-5 border-t">
        <button className="p-2 rounded-lg border hover:bg-gray-100" onClick={() => {setCurrentPage(1)}}><ChevronFirst size={18} /></button>
        <button className="p-2 rounded-lg border hover:bg-gray-100" onClick={() => {setCurrentPage(currentPage <= 1 ? 1 : currentPage-1 )}}><ChevronLeft size={18} /></button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded
              ${
                currentPage === page
                  ? "bg-black text-white"
                  : "border"
              }
            `}
          >
            {page}
          </button>
        ))}
        <button className="p-2 rounded-lg border hover:bg-gray-100" onClick={() => {setCurrentPage(currentPage >= totalPages ? totalPages : currentPage+1 )}}><ChevronRight size={18} /></button>
        <button className="p-2 rounded-lg border hover:bg-gray-100" onClick={() => {setCurrentPage(totalPages)}}><ChevronLast size={18} /></button>
      </div>
      </div>
    </section>
  );
};

export default Customers;
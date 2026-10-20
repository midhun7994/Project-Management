import Sidebar from './Sidebar'
import Navbar from './Navbar'

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
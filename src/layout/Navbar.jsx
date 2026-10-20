import { LogOut, Bell } from 'lucide-react'
import { useAuthStore } from '../features/auth/authStore'

function Navbar() {
  const { user, logout } = useAuthStore()

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
      <span className="font-medium text-gray-700">
        Welcome{user?.name ? `, ${user.name}` : ''}
      </span>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800">
          <Bell size={20} />
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
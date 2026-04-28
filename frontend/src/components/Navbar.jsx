export default function Navbar({ userEmail, onLogout }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📝 Task Manager</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{userEmail}</span>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

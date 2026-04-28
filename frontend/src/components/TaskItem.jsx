export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const handleToggleStatus = () => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    onToggle(task.id, newStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3 flex items-start justify-between hover:shadow-md transition">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.status === 'Completed'}
            onChange={handleToggleStatus}
            className="w-5 h-5 cursor-pointer"
          />
          <div className="flex-1">
            <h3
              className={`font-semibold text-lg ${
                task.status === 'Completed'
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 text-sm mt-1">{task.description}</p>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              task.status === 'Completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.status}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(task.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

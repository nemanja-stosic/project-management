import NewTask from "./NewTask";

export default function Tasks({ tasks, onAdd, onClear, selectedProjectId }) {
  let contentTasks;

  if (tasks.length > 0) {
    contentTasks = tasks.map((task) => {
      console.log(tasks);
      // showing only tasks for created projects
      if (selectedProjectId === task.projectId) {
        return (
          <li key={task.id} className="flex justify-between my-4">
            <span>{task.name}</span>
            <button
              className="text-stone-700 hover:text-red-500"
              onClick={() => onClear(task.id)}
            >
              Clear
            </button>
          </li>
        );
      }
    });
  } else {
    contentTasks = (
      <p className="text-stone-800 my-4">
        This project does not have any tasks yet.
      </p>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      <ul className="p-4 mt-8 bg-stone-100">{contentTasks}</ul>
    </section>
  );
}

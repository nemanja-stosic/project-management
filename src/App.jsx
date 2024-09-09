import { useState } from "react";
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  // will store id of project that was selected, null if we want to add
  // new project, undefiend if we don't want to add new project or we
  // didn't selected any project
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        projectId: prevState.selectedProjectId,
        name: text,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleClearTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleSaveProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      //we are copying prevois array data (projects) and then adding new project
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleSelectProject(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  }

  //getting the id of currently selected project
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content;

  //showing NewProject or NoProjectSelected
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onSave={handleSaveProject} onCancel={handleCancelProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleStartAddProject} />;
  } else {
    //showing currently selected project if id is neither null nor undefined
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDelete}
        onAddTask={handleAddTask}
        onClearTask={handleClearTask}
        tasks={projectsState.tasks}
        selectedProjectId={selectedProject.id}
      />
    );
  }

  function handleCancelProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDelete() {
    //will check if project id is not equal to currently selected id
    //becuase if its not we want to delete it,
    //function will return true if ids do not match and we will keep them, if ids match return false and delete it
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  return (
    <main className="flex h-screen gap-8">
      <ProjectSidebar
        onAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectedProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

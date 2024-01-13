import React, { useState, useEffect } from "react";
import { Project } from "../../../@types/projects/types";
import IterationDetail from "./IterationDetail";

const IterationTracker: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const updateProject = (updatedProject: Project) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === updatedProject.id) {
          return {
            ...project,
            ...updatedProject,
          };
        }
        return project;
      });
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  );

  const handleAddProject = () => {
    if (projectName === "") return;
    setProjects([...projects, { name: projectName, id: generateId() }]);
    setProjectName("");
  };

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  return (
    <div className="bg-white min-h-screen max-w-[1000px]  mx-auto">
      <h1 className="text-center text-4xl font-bold text-blue-500 pt-8">
        毫末
      </h1>
      <div className="flex justify-between mt-10">
        <div className="project-list flex-1 ml-10 min-w-[300px]">
          <input
            className="border border-gray-300 px-3 py-2 rounded "
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="项目名称"
          />
          <button
            className="ml-5 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddProject}
          >
            添加项目
          </button>
          <ul className="list-none mt-10 max-w-xs">
            {projects.map((project, index) => (
              <li
                key={index}
                className="p-2 border-b border-gray-200 bg-blue-200 shadow my-2 rounded text-gray-900"
                onClick={() => {
                  setCurrentProjectId(project.id);
                }}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="project-detail flex-1 ml-20 min-w-[300px]">
          <IterationDetail
            project={currentProject}
            updateProject={updateProject}
          ></IterationDetail>
        </div>
      </div>
    </div>
  );
};

export default IterationTracker;

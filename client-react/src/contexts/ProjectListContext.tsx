import React from "react";
import { IProject } from "../interfaces/IProject";
import { toast } from "react-toast";
import { useLocalStorage } from "usehooks-ts";

export type ProjectListContextProps = {
  projectToCancel: IProject[] | [];
  addProjectToCancel: (project: IProject) => void;
  deleteProjectFromCancellationList: (id: IProject["id"],name: IProject["name"]) => void;
  checkIfAdded: (id: IProject["id"]) => boolean;
  count: number;
};

const CANCELLATION_LIST_KEY = "cancellationList";

export const ProjectListContext = React.createContext<
  ProjectListContextProps | {}
>({});

const ProjectListContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [projectToCancel, setProjectToCancel] = useLocalStorage<Array<IProject>>(
    CANCELLATION_LIST_KEY,
    []
  );

  const addProjectToCancel = (project: IProject) => {
    const isprojectAlreadyAdded = projectToCancel.some(
      (cProject) => cProject.id === project.id
    );
    if (isprojectAlreadyAdded) return;
    toast.success("project added to the cancellation list!", {
      backgroundColor: "#16A349",
    });
    setProjectToCancel([...projectToCancel, project]);
  };

  const deleteProjectFromCancellationList = (id: IProject["id"], name: IProject["name"]) => {
    const isAdded = projectToCancel.some(
      (cproject) => cproject.id === id
    );
    if (!isAdded) return;
    const hasConfirmed = confirm(
      `Are you sure you want to delete project number ${name} from the list?`
    );
    if (!hasConfirmed) return;
    setProjectToCancel(
      projectToCancel.filter((project) => project.id !== id)
    );
    toast.error("project removed from the cancellation list!");
  };

  const count = React.useMemo(() => projectToCancel.length, [projectToCancel]);

  const checkIfAdded = React.useCallback(
    (id: IProject["id"]) => {
      return projectToCancel.some((cproject) => cproject.id === id);
    },
    [projectToCancel]
  );

  return (
    <ProjectListContext.Provider
      value={{
        projectToCancel: projectToCancel,
        addProjectToCancel,
        deleteProjectFromCancellationList,
        count,
        checkIfAdded,
      }}
    >
      {children}
    </ProjectListContext.Provider>
  );
};

export default ProjectListContextProvider;

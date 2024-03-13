import { FC } from "react";
import useProjectList from "../hooks/useProjectList";
import { IProject } from "../interfaces/IProject";
import Card from "./Card";
import { Data } from "../pages/Explore";


interface IProps {
  data: IProject[];
}

const ProjectListGrid: FC<IProps> = ({ data}) => {
  const { addProjectToCancel, checkIfAdded, deleteProjectFromCancellationList } =
    useProjectList();

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-12">
      {data?.map((project) => {
        return (
          <Card
            {...project}
            key={project.id}
            isAdded={checkIfAdded(project.id)}
            handleAddToCancellationList={() => addProjectToCancel(project)}
            handleRemoveFromCancellationList={() =>
              deleteProjectFromCancellationList(project.id,project.name)
            }
          />
        );
      })}
    </div>
  );
};

export default ProjectListGrid;

import ProjectListGrid from "../components/ProjectListGrid";
import useProjectList from "../hooks/useProjectList";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

const CancellationList = () => {
  const { projectToCancel } = useProjectList();
  return (
    <div className="flex flex-1 flex-col flex-center">
      <Header text="Cancellation List" />
      {projectToCancel.length ? (
        <ProjectListGrid data={projectToCancel} />
      ) : (
        <NotFound text="Add the projects to the cancellation list!" />
      )}
    </div>
  );
};

export default CancellationList;

import { useContext } from "react";
import { ProjectListContextProps, ProjectListContext } from "../contexts/ProjectListContext";

const useProjectList = () => {
  const values = useContext(ProjectListContext);
  if (!values)
    throw new Error(
      "Please make sure the component you are using is wrapped with correct provider!"
    );
  return values as ProjectListContextProps;
};

export default useProjectList;

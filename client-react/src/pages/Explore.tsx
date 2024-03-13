import ProjectListGrid from "../components/ProjectListGrid";
import Header from "../components/Header";
import React from "react";
import AddModal from "../components/AddModal";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { IProject } from "../interfaces/IProject";
import { ADD_PROJECT } from "../mutation/projectMutations";
import { toast } from "react-toast";
import { IProjectFormData } from "../interfaces/IProjectFormData";
import Spinner from "../components/Spinner";

export interface Data {
  projects: IProject[];
}

const Explore = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { loading, data, error } = useQuery<Data>(GET_PROJECTS);
  const [addProject] = useMutation(ADD_PROJECT);

  const handleSubmit = (data: IProjectFormData, image: string) => {
    const { name, status, description, clientId } = data;
    addProject({
      variables: {
        name,
        status,
        description,
        clientId,
        image,
      },
      refetchQueries: [{ query: GET_PROJECTS }],
    });
    toast.success("Project added succesfully!", {
      backgroundColor: "#16A349",
    });
    setIsModalOpen(false);
  };

  if (loading) return <Spinner />
  return (
    <React.Fragment>
      <div className="flex justify-end mt-8">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          Add New Project
        </button>
      </div>
      <Header text="Projects" />
      <ProjectListGrid data={data?.projects as IProject[]} />
      <AddModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

export default Explore;

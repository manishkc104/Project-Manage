import React, { ChangeEvent, FormEvent } from "react";
import { IProject } from "../interfaces/IProject";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo, { IClient } from "./ClientInfo";
import { UPDATE_PROJECT } from "../mutation/projectMutations";
import { toast } from "react-toast";
import Spinner from "./Spinner";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery<{ project: IProject }>(
    GET_PROJECT,
    { variables: { id } }
  );

  const projectData = data?.project;

  const getStatus = (status: string) => {
    switch (status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  };

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    status: "",
  });

  React.useEffect(() => {
    if (!projectData) return;
    setFormData({
      name: projectData.name,
      description: projectData.description,
      status: getStatus(projectData.status),
    });
  }, [projectData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [updateProject] = useMutation(UPDATE_PROJECT);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData?.name || !formData.description || !formData.status) {
      return alert("Please fill out all fields");
    }
    const { name, description, status } = formData;
    updateProject({
      variables: { id: projectData?.id, name, description, status },
      refetchQueries: [
        { query: GET_PROJECT, variables: { id: projectData?.id } },
      ],
    }).then(() => {
      toast.success("Project updated succesfully!", {
        backgroundColor: "#16A349",
      });
    });
  };

  if(loading) return <Spinner/>

  return (
    <div className="container mx-auto p-6 bg-inherit rounded-lg shadow-lg space-y-6">
      <h2 className="text-4xl text-center text-blue-400 font-bold mb-4">
        {projectData?.name}
      </h2>

      <div className="flex justify-center">
        <img
          className="max-w-full h-auto object-cover rounded-lg"
          src={projectData?.image}
          alt="image"
          style={{ maxWidth: "600px", height: "auto" }}
        />
      </div>

      <p className="text-gray-300 text-lg text-center">
        {projectData?.description}
      </p>

      <div className="md:grid md:grid-cols-2 md:gap-6">
        <ClientInfo client={projectData?.client as IClient} />

        <form onSubmit={handleSave} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Project Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={formData?.status}
              onChange={handleChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;

import { useQuery } from "@apollo/client";
import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { GET_CLIENTS } from "../queries/clientQueries";
import Dropzone, { FileWithPath } from "react-dropzone";
import { IProjectFormData } from "../interfaces/IProjectFormData";

interface IProps {
    isOpen: boolean;
    toggleModal: any;
    onSubmit: (data: IProjectFormData, image: string) => void;
}

interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
}
const AddModal = (props: IProps) => {
    const { loading, error, data } = useQuery<{ clients: Client[] }>(GET_CLIENTS);
    const [image, setImage] = React.useState("");

    const [formData, setFormData] = React.useState({
        clientId: "",
        name: "",
        description: "",
        status: "",
        image: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDrop = (acceptedFiles: FileWithPath[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(formData, image);
        setFormData({
            clientId: "",
            name: "",
            description: "",
            status: "",
            image: "",
        });

        setImage("");
    };

    return (
        <div
            className={`${props.isOpen ? "" : "hidden"
                } fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center`}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-xl p-8 m-4 min-w-modal max-h-full text-left overflow-auto"
                style={{ maxHeight: "80%" }}
            >
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold">Add Project Modal</h4>
                    <button
                        className="text-black"
                        type="button"
                        onClick={props.toggleModal}
                    >
                        &times;
                    </button>
                </div>
                <div className="mt-4">
                    <div className="container mx-auto p-4">
                        <div className="mb-4">
                            <label
                                htmlFor="clientId"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Client:
                            </label>
                            <select
                                id="clientId"
                                name="clientId"
                                value={formData.clientId}
                                onChange={handleChange}
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value=""></option>
                                {data?.clients?.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                                value={formData.name}
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
                                value={formData.description}
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
                                value={formData.status}
                                onChange={handleChange}
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="new">Not Started</option>
                                <option value="progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="image"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Image:
                            </label>
                            <Dropzone onDrop={handleDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className="border-2 border-dashed border-gray-400 p-2 rounded-lg">
                                                Upload the image
                                            </div>
                                            {image && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginTop: "2rem",
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            height: "250px",
                                                            width: "250px",
                                                        }}
                                                        src={image}
                                                        alt="Preview"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none mr-4"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                        onClick={props.toggleModal}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddModal;

import React, { ChangeEvent, FormEvent } from "react";
import { IClientFormData } from "../interfaces/IClientFormData";

interface IProps {
    isOpen: boolean;
    toggleModal: any;
    onSubmit: (data: IClientFormData) => void;
}

const AddClientModal = (props: IProps) => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(formData);
        setFormData({
            name: "",
            email: "",
            phone: "",
        });
    };

    return (
        <div
            className={`${props.isOpen ? "" : "hidden"
                } fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center`}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-xl p-8 m-4 min-w-modal max-h-full text-left"
            >
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold">Add Client Modal</h4>
                    <button
                        type="button"
                        className="text-black"
                        onClick={props.toggleModal}
                    >
                        &times;
                    </button>
                </div>
                <div className="mt-4">
                    <div className="container mx-auto p-4">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Phone Number:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="123-456-7890"
                                value={formData.phone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
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
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                        onClick={props.toggleModal}
                    >
                        Close
                    </button>{" "}
                </div>
            </form>
        </div>
    );
};

export default AddClientModal;

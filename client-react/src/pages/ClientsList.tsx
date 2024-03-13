import React from 'react'
import { useQuery } from '@apollo/client';
import Header from "../components/Header";
import AddClientModal from '../components/AddClientModal';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import { ADD_CLIENT, DELETE_CLIENT } from '../mutation/clientMutation';
import { toast } from 'react-toast';
import Spinner from '../components/Spinner';
import { IClientFormData } from '../interfaces/IClientFormData';


interface Client {
  id: string,
  name: string;
  email: string;
  phone: string;
}

interface Data {
  clients: Client[];
}



const ClientsList = () => {

  const { loading, data, error } = useQuery<Data>(GET_CLIENTS)
  const [deleteClient] = useMutation(DELETE_CLIENT);
  const [addClient] = useMutation(ADD_CLIENT)

  const handleDelete = (id: string) => {
    deleteClient({ variables: { id }, refetchQueries: [{ query: GET_CLIENTS }] }).then(() => {
      toast.error("Client removed successfully!");
    });
  }

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (data: IClientFormData) => {
    const { name, email, phone } = data;
    addClient({ variables: { name, email, phone }, refetchQueries: [{ query: GET_CLIENTS }] }).then(() => {
      toast.success("Client added successfully", {
        backgroundColor: "#16A349",
      });
      setIsModalOpen(false);
    })
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="flex justify-end mt-8">
        <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>
          Add New Client
        </button>
      </div>
      <Header text="Clients" />
      <div className="container mx-auto p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.clients?.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-white">{item.name}</td>
                <td className="border px-4 py-2 text-white">{item.email}</td>
                <td className="border px-4 py-2 text-white">{item.phone}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <AddClientModal isOpen={isModalOpen} toggleModal={toggleModal} onSubmit={handleSubmit} />
    </div>
  );
};

export default ClientsList;

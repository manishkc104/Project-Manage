import React from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';


export interface IClient {
    id: string
    name: string
    email: string
    phone: string

}

const ClientInfo = ({ client }: { client: IClient }) => {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div className="mb-4">
                <FaUser className="inline-block text-gray-700 text-lg mr-2" />
                <span className="font-semibold">Name:</span> {client?.name}
            </div>
            <div className="mb-4">
                <FaEnvelope className="inline-block text-gray-700 text-lg mr-2" />
                <span className="font-semibold">Email:</span> {client?.email}
            </div>
            <div>
                <FaPhone className="inline-block text-gray-700 text-lg mr-2" />
                <span className="font-semibold">Phone:</span> {client?.phone}
            </div>
        </div>
    );
};

export default ClientInfo;

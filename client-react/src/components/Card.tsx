import React from "react";
import AddToCancellationListButton from "./buttons/AddToCancellationListButton";
import Tag from "./Tag";
import { IProject } from "../interfaces/IProject";

interface CardProps extends IProject {
  handleAddToCancellationList: () => void;
  handleRemoveFromCancellationList: () => void;
  isAdded: boolean;
}

const Card: React.FC<CardProps> = ({
  status,
  id,
  name,
  image,
  description,
  handleAddToCancellationList,
  handleRemoveFromCancellationList,
  isAdded,
}) => {
  const shortenTheDescription = (text: string, textLength: number) => {
    if (text.length <= textLength) {
      return text;
    }
    return text.substring(0, textLength) + "...";
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg relative">
      <div className="h-52 w-full relative">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="Card"
        />
        <div className="absolute top-2 right-2">
          <Tag text={status} />
        </div>
        <div className="absolute bottom-2 right-2">
          <AddToCancellationListButton
            id={id}
            isAdded={isAdded}
            onClick={
              isAdded
                ? handleRemoveFromCancellationList
                : handleAddToCancellationList
            }
          />
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white text-xl font-semibold">{name}</h3>
          <a
            href={`/projects/${id}`}
            className="bg-teal-500 hover:bg-teal-700 text-white font-semi-bold py-1 px-2 rounded"
          >
            View
          </a>
        </div>
        <p className="text-gray-400 text-base">
          {shortenTheDescription(description, 70)}
        </p>
      </div>
    </div>
  );
};

export default Card;

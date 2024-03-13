import React from "react";
import { Link } from "react-router-dom";

type Props = {
  text?: string;
};

const NotFound: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-transparent  text-gray-200 flex-1">
      <h1 className="text-4xl font-bold ">
        {props.text || "404 - Not Found!"}
      </h1>
      <Link
        to="/"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

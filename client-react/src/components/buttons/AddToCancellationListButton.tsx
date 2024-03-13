import React, { ReactEventHandler } from "react";
import { Tooltip } from "react-tooltip";
import cx from "classnames";
import CleaningBroom from "../../icons/cleaningBroom";

type Props = {
  onClick: ReactEventHandler<HTMLButtonElement>;
  isAdded: boolean;
  id: string;
};

const AddToCancellationListButton = (props: Props) => {
  return (
    <React.Fragment>
      <button
        className={cx(
          "text-white rounded-xl px-2 py-2 text-sm flex items-center justify-center focus:outline-nonetransition-colors",
          props.isAdded ? "bg-red-600 hover:bg-red-500 " : "bg-blue-600 hover:bg-green-500 ",
        )}
        data-tooltip-id={props.id}
        onClick={props.onClick}
      >
        {props.isAdded ? (
          <>Remove From Cancellation List</>
        ) : (
          <>
            <span className="mr-2">Add to Cancellation List</span>
            <CleaningBroom />
          </>
        )}
      </button>
      <Tooltip
        id={props.id}
        place="bottom-end"
        content={
          props.isAdded ? "Remove from Cancellation list!" : "Needs Cancellation!"
        }
      />
    </React.Fragment>
  );
};

export default AddToCancellationListButton;

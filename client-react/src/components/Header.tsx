import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  text: string;
};

const Header = (props: Props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{props.text}</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-300 font-mono mt-4 mb-4 text-left">
        {props.text}
      </h2>
    </React.Fragment>
  );
};

export default Header;

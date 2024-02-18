import React, { FC, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

import * as Styled from "./styled";

type TOptions = {
  label: string;
  action: () => void;
};

type MoreOptionsProps = {
  title?: string;
  options: TOptions[];
};

const MoreOptions: FC<MoreOptionsProps> = ({ title, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleBlur = () => {
    setShowOptions(false);
  };

  return (
    <Styled.Container>
      <FaEllipsisV onClick={() => setShowOptions(!showOptions)} />
      {showOptions && (
        <Styled.OptionsWarper onBlur={handleBlur} tabIndex={0}>
          {options.map((option) => {
            return <div onClick={option.action}>{option.label}</div>;
          })}
        </Styled.OptionsWarper>
      )}
    </Styled.Container>
  );
};

export default MoreOptions;

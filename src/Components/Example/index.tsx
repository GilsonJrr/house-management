import React, { FC } from "react";

import * as Styled from "./styled";

type ExampleProps = {
  title?: string;
};

const Example: FC<ExampleProps> = ({ title }) => {
  return <Styled.Container>{title}</Styled.Container>;
};

export default Example;

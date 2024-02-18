import React, { Children, FC, ReactNode } from "react";

import * as Styled from "./styled";

type ModalProps = {
  display?: boolean;
  close: () => void;
  title?: string;
  children?: ReactNode | ReactNode[];
};

const Modal: FC<ModalProps> = ({ close, display, title, children }) => {
  const handleCloseModal = () => {
    close();
  };

  if (!display) {
    return null;
  }

  return (
    <Styled.ModalBackGround>
      <Styled.Container>
        <Styled.CloseTag onClick={handleCloseModal} />
        <Styled.Title>{title}</Styled.Title>
        <Styled.ModalContainer>{children}</Styled.ModalContainer>
      </Styled.Container>
    </Styled.ModalBackGround>
  );
};

export default Modal;

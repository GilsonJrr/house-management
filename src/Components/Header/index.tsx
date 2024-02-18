import React, { FC } from "react";

import { FaBars } from "react-icons/fa";

import * as Styled from "./styled";

type HeaderProps = {
  title?: string;
  userPhoto?: string;
  userName?: string;
};

const Header: FC<HeaderProps> = ({ title, userPhoto, userName }) => {
  return (
    <Styled.Container>
      <Styled.IconWarper>
        <FaBars size={22} />
      </Styled.IconWarper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.PhotoWarper>
        {userPhoto ? <Styled.Photo src={userPhoto} /> : userName?.[0]}
      </Styled.PhotoWarper>
    </Styled.Container>
  );
};

export default Header;

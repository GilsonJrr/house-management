import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: relative;
`;

export const ButtonBlur = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 10%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  bottom: 0;
  right: 0;
`;

export const AddNewButton = styled.button`
  position: fixed;
  bottom: 30px;
  width: 90%;
  margin: 0 5%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #58536b;
  color: #ffffff;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
  z-index: 100;
`;

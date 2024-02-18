import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Text = styled.h2`
  font-size: 20px;
  text-align: center;
  padding-bottom: 4px;
  border-bottom: 2px solid #afafaf;
`;

export const Label = styled.label``;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #363434;
`;

export const Button = styled.button`
  background-color: #58536b;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
  margin-top: 40px;
  &:disabled {
    background-color: #afafaf;
  }
`;

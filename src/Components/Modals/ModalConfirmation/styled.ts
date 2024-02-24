import styled from "styled-components";

type Props = {
  active?: boolean;
  buttonType?: "cancel" | "done" | "delete";
  color?: string;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 15px;
`;

export const Text = styled.h2`
  font-size: 20px;
  text-align: center;
  padding-bottom: 4px;
`;

export const TaskName = styled.h2<Props>`
  font-size: 25px;
  text-align: center;
  padding-bottom: 4px;
  text-align: center;
  border: 3px solid ${({ color }) => color || "#afafaf"};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`;

export const Label = styled.label``;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #363434;
`;

export const EditButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 100px;
  width: 100%;
`;

export const EditButton = styled.button<Props>`
  background-color: ${({ buttonType }) =>
    buttonType === "cancel"
      ? "#afafaf"
      : buttonType === "done"
      ? "#2f7d35"
      : "#c25d5d"};
  outline: none;
  padding: 10px 0;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  text-align: center;
  border: none;
  &:disabled {
    opacity: 0.5;
  }
`;

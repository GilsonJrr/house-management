import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  active?: boolean;
  buttonType?: "edit" | "done";
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

export const Header = styled.div`
  position: relative;
`;

export const DeleteIcon = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  outline: none;
  background-color: transparent;
`;

export const Text = styled.h2`
  font-size: 20px;
  text-align: center;
  padding-bottom: 4px;
  border-bottom: 2px solid #afafaf;
`;

export const Label = styled.label`
  margin-top: 8px;
`;

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
  width: 100%;
  &:disabled {
    background-color: #afafaf;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DateSelectorContainer = styled.div`
  width: 100%;
  padding: 9px;
  border-radius: 10px;
  border: 1px solid #363434;
`;

export const DateSelector = styled(DatePicker)`
  width: 100%;
  border: none;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #363434;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #363434;
  min-height: 200px;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

export const ButtonSmall = styled.div<Props>`
  background-color: ${({ active }) => (active ? "#58536b" : "transparent")};
  border: 1px solid ${({ active }) => (active ? "transparent" : "#58536b")};
  outline: none;
  padding: 10px 0;
  border-radius: 10px;
  color: ${({ active }) => (active ? " #FFFFFF" : "#58536b")};
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  text-align: center;
  &:disabled {
    background-color: #afafaf;
  }
`;

export const EditButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 40px;
`;

export const EditButton = styled.button<Props>`
  background-color: ${({ buttonType }) =>
    buttonType === "edit" ? "#e0c769" : "#2f7d35"};
  outline: none;
  padding: 10px 0;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  text-align: center;
  border: none;
`;

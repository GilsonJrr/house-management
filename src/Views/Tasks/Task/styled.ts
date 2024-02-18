import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  color?: string;
};

export const Container = styled.div<Props>`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ color }) => color};
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const TaskContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  margin: 70px 0 0;
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
  margin-top: 10px;
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
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DateSelector = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #363434;
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

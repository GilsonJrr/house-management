import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
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

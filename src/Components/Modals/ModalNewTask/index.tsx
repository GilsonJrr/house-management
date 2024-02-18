import React, { FC, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import * as Styled from "./styled";
import Modal from "../ModalBase";
import ColorSelector from "../../ColorSelector";
import { generateUID } from "../../../utils";
import { ref, set } from "firebase/database";
import { database } from "../../../libs/Firebase";
import RoomCard from "../../RoomCard";

const schema = yup.object().shape({
  task: yup.string().required(),
  person: yup.string().required(),
  dueDate: yup.string().required(),
  importance: yup.string().required(),
  observation: yup.string(),
});

interface FormData {
  task: string;
  person: string;
  addedDate: string;
  dueDate: Date;
  doneDate: string;
  status: string;
  importance: string;
  observation: string;
}

type TRooms = {
  roomName: string;
  color: string;
  icon: string;
  id: string;
};

type ModalNewTaskProps = {
  close: () => void;
  display?: boolean;
  room?: TRooms;
};

const ModalNewTask: FC<ModalNewTaskProps> = ({ display, close, room }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    addTask(data);
  };

  const addTask = (data: FormData) => {
    const taskID = generateUID(10);
    set(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${taskID}`), {
      id: taskID,
      task: data.task,
      person: data.person,
      addedDate: new Date().toISOString(),
      doneDate: "",
      dueDate: new Date(data.dueDate).toISOString(),
      status: "pended",
      importance: data.importance,
      observation: data.observation,
    })
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
    close();
    reset();
  };

  const handleClose = () => {
    close();
    reset();
  };

  // const disabledButton = roomName.length < 2 || !color;

  console.log("dueDate", watch("dueDate"));

  return (
    <Modal display={display} close={handleClose}>
      <Styled.Container>
        <Styled.Text>Nova Atividade</Styled.Text>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Label>Nome da Atividade</Styled.Label>
          <Styled.Input {...register("task")} />
          <Styled.Label>Responsavel</Styled.Label>
          <Styled.Select {...register("person", { required: true })}>
            <option value="" selected>
              Selecione...
            </option>
            <option value="gilson">Gilson</option>
            <option value="Elis">Elis</option>
          </Styled.Select>
          <Styled.Label>Data Final</Styled.Label>
          <Styled.DateSelector
            selected={watch("dueDate")}
            onChange={(date: Date) => setValue("dueDate", date)}
          />
          <Styled.Label>Importacia</Styled.Label>
          <Styled.Select {...register("importance", { required: true })}>
            <option value="" selected>
              Selecione...
            </option>
            <option value="low">Baixo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
          </Styled.Select>
          <Styled.Label>Observacao</Styled.Label>
          <Styled.Textarea {...register("observation")} />

          <Styled.Button type="submit">Adicionar Novo Comodo</Styled.Button>
        </Styled.Form>
      </Styled.Container>
    </Modal>
  );
};

export default ModalNewTask;

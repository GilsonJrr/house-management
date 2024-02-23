import React, { FC, useEffect, useState } from "react";

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
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { TimesOfTheDay } from "../../../Consts";
import { FaTrash } from "react-icons/fa";

const schema = yup.object().shape({
  task: yup.string().required(),
  person: yup.string().required(),
  dueDate: yup.string(),
  dueDay: yup.string(),
  recurrent: yup.boolean(),
  dueTime: yup.string().required(),
  importance: yup.string().required(),
  observation: yup.string(),
});

interface FormData {
  id: string;
  task: string;
  person: string;
  addedDate: string;
  dueDate: Date;
  dueDay: string;
  dueTime: string;
  recurrent: boolean;
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
  edit?: boolean;
  taskData?: FormData;
};

const ModalNewTask: FC<ModalNewTaskProps> = ({
  display,
  close,
  room,
  edit,
  taskData,
}) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    addTask(data);
  };

  const addTask = (data: FormData) => {
    const taskID = edit ? taskData?.id : generateUID(10);
    set(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${taskID}`), {
      id: taskID,
      task: data.task,
      person: data.person,
      addedDate: new Date().toISOString(),
      doneDate: "",
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : "",
      dueDay: data.dueDay ? data.dueDay : "",
      dueTime: data.dueTime,
      recurrent: data.recurrent ? data.recurrent : false,
      status: "pendent",
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

  const handleDone = () => {
    const taskID = edit ? taskData?.id : generateUID(10);
    set(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${taskID}`), {
      ...taskData,
      status: "done",
      doneDate: new Date(),
    })
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
    close();
    reset();
  };

  useEffect(() => {
    reset(taskData);
  }, [reset, taskData]);

  return (
    <Modal display={display} close={handleClose}>
      <Styled.Container>
        <Styled.Header>
          <Styled.Text>{edit ? "Editar" : "Nova"} Atividade</Styled.Text>
          <Styled.DeleteIcon>
            <FaTrash />
          </Styled.DeleteIcon>
        </Styled.Header>
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
          <Styled.Label>Data</Styled.Label>
          <Styled.DateContainer>
            <Styled.ButtonSmall
              active={watch("recurrent")}
              onClick={() => setValue("recurrent", !watch("recurrent"))}
            >
              Recorente
            </Styled.ButtonSmall>
            {watch("recurrent") ? (
              <Styled.Select {...register("dueDay", { required: true })}>
                <option value="" selected>
                  Selecione...
                </option>
                <option value="daily">Todos os dias</option>
                <option value="mondays">Todas as segundas</option>
                <option value="tuesdays">Todas as terças</option>
                <option value="wednesdays">Todas as quartas</option>
                <option value="thursdays">Todas as quintas</option>
                <option value="fridays">Todas as sextas</option>
                <option value="saturdays">Todos os sábados</option>
                <option value="sundays">Todos os domingos</option>
                <option value="15days">A cada 15 dias</option>
                <option value="30days">A cada 30 dias</option>
              </Styled.Select>
            ) : (
              <Styled.DateSelectorContainer>
                <Styled.DateSelector
                  selected={watch("dueDate")}
                  onChange={(date: Date) => setValue("dueDate", date)}
                />
              </Styled.DateSelectorContainer>
            )}
            <Styled.Select {...register("dueTime", { required: true })}>
              <option value="" selected>
                Selecione...
              </option>
              {TimesOfTheDay.map((time) => {
                return <option value={time}>{time}</option>;
              })}
            </Styled.Select>
          </Styled.DateContainer>
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

          {edit ? (
            <Styled.EditButtonContainer>
              {!taskData?.recurrent && (
                <Styled.EditButton buttonType="done" onClick={handleDone}>
                  Marcar como comcluido
                </Styled.EditButton>
              )}
              <Styled.EditButton buttonType="edit" type="submit">
                Atualizar
              </Styled.EditButton>
            </Styled.EditButtonContainer>
          ) : (
            <Styled.Button type="submit">
              Adicionar Nova Atividade
            </Styled.Button>
          )}
        </Styled.Form>
      </Styled.Container>
    </Modal>
  );
};

export default ModalNewTask;

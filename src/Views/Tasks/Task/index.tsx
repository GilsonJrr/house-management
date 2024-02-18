import React, { useEffect, useState } from "react";

import * as Styled from "./styled";
import { database } from "../../../libs/Firebase";
import { get, ref, set, remove } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaChevronLeft } from "react-icons/fa";

type TChores = {
  id: string;
  task: string;
  person: string;
  dueDate: Date;
  status: string;
  importance: string;
  addedDate: Date;
  observation: string;
};

type TRooms = {
  roomName: string;
  color: string;
  icon: string;
  id: string;
  tasks: TChores[];
};

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
  addedDate: Date;
  dueDate: Date;
  doneDate: Date;
  status: string;
  importance: string;
  observation: string;
}

const Task = () => {
  const navigate = useNavigate();
  const { roomId, taskID } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const [chores, setChores] = useState<TChores>();
  const [room, setRoom] = useState<TRooms>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    const updateData = {
      id: taskID || "",
      task: data.task,
      person: data.person,
      addedDate: chores?.addedDate || new Date(),
      doneDate: "",
      dueDate: data.dueDate,
      status: data.status,
      importance: data.importance,
      observation: data.observation,
    };
    addTask(updateData);
  };

  const addTask = (data: TChores) => {
    set(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${taskID}`), data)
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
    reset();
    navigate("/");
  };

  const removeTask = () => {
    remove(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${taskID}`))
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
    reset();
    navigate("/");
  };

  useEffect(() => {
    // const resetValues {
    //   task: cho
    // }
    if (chores) {
      reset(chores);
    }
  }, [reset, chores]);

  useEffect(() => {
    get(ref(database, `QNC8XseB4G/rooms/${roomId}`))
      .then((rooms) => setRoom(rooms.val() as TRooms))
      .catch((err) => {
        throw new Error(err);
      });
  }, [roomId]);

  useEffect(() => {
    get(ref(database, `QNC8XseB4G/rooms/${roomId}/tasks/${taskID}`))
      .then((rooms) => setChores(rooms.val() as TChores))
      .catch((err) => {
        throw new Error(err);
      });
  }, [roomId, taskID]);

  console.log("chrores", room);

  return (
    <Styled.Container color={room?.color}>
      <Styled.Header>
        <FaChevronLeft size={30} onClick={() => navigate("/")} />{" "}
        <h1>{room?.roomName}</h1>
        <div></div>
      </Styled.Header>
      <Styled.TaskContainer>
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
          <Styled.Label>Estado</Styled.Label>
          <Styled.Select {...register("status", { required: true })}>
            <option value="" selected>
              Selecione...
            </option>
            <option value="pended">Pendente</option>
            <option value="done">Concluido</option>
          </Styled.Select>
          <Styled.Label>Observacao</Styled.Label>
          <Styled.Textarea {...register("observation")} />
          <Styled.ButtonsContainer>
            <Styled.Button type="submit">Atualizar</Styled.Button>
            <Styled.Button onClick={removeTask}>Deletar</Styled.Button>
          </Styled.ButtonsContainer>
        </Styled.Form>
      </Styled.TaskContainer>
    </Styled.Container>
  );
};

export default Task;

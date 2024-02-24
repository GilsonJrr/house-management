import React, { FC, useState } from "react";
import { FaBed } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import * as Styled from "./styled";
import MoreOptions from "../MoreOptions";
import { generateUID } from "../../utils";
import { ref, set } from "firebase/database";
import { database } from "../../libs/Firebase";
import ModalNewTask from "../Modals/ModalNewTask";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/pt-br";
import ModalConfirmation from "../Modals/ModalConfirmation";

type TChores = {
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
};

type TRooms = {
  roomName: string;
  color: string;
  icon: string;
  id: string;
  tasks: TChores[];
};

type RoomCardProps = {
  room?: TRooms;
  chores?: TChores[];
  preview?: boolean;
  onRoomEdit?: (room: TRooms) => void;
};

enum EDays {
  "daily" = "Todos os dias",
  "mondays" = "Todos as Segundas",
  "tuesdays" = "Todos as Terças",
  "wednesdays" = "Todos as Quartas",
  "thursdays" = "Todos as Quintas",
  "fridays" = "Todos as Sextas",
  "saturdays" = "Todos os Sábados",
  "sundays" = "Todos os Domingos",
  "15days" = "A cada 15 dias",
  "30days" = "A cada 30 dias",
}

const RoomCard: FC<RoomCardProps> = ({
  room,
  chores = [],
  preview,
  onRoomEdit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showChores, setShowChores] = useState(false);
  const [confirmationType, setConfirmationType] = useState<"done" | "delete">(
    "done"
  );

  const [taskEdit, setTaskEdit] = useState<{
    edit: boolean;
    taskData?: TChores | undefined;
  }>();

  const handleShowChores = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowChores((prev) => !prev);
  };

  const handleOpenTaskModal = (
    type: "edit" | "new" | "confirm",
    data?: TChores
  ) => {
    const options =
      type === "edit" || type === "confirm"
        ? { edit: true, taskData: data }
        : {
            edit: false,
            taskData: {
              id: "",
              task: "",
              person: "",
              addedDate: "",
              dueDate: "",
              dueDay: "",
              dueTime: "",
              recurrent: false,
              doneDate: "",
              status: "",
              importance: "",
              observation: "",
            } as unknown as TChores,
          };
    setTaskEdit(options);
    type === "confirm" ? setShowConfirmationModal(true) : setShowModal(true);
  };

  const pendentTasks = Object.values(room?.tasks || "").filter(
    (task) => task.status === "pendent"
  );

  const doneTasks = Object.values(room?.tasks || "").filter(
    (task) => task.status === "done"
  );

  return (
    <Styled.Container color={room?.color} expand={showChores && !preview}>
      <Styled.HeaderContainer expand={showChores && !preview}>
        <Styled.IconWarper color={room?.color} onClick={handleShowChores}>
          <FaBed size={30} />
        </Styled.IconWarper>
        <Styled.BodyWarper onClick={handleShowChores}>
          <Styled.RoomTitle>{room?.roomName}</Styled.RoomTitle>
          <Styled.ActivitiesTag>
            {pendentTasks.length} Atividade
            {pendentTasks.length > 1 ? "s" : ""}
          </Styled.ActivitiesTag>
        </Styled.BodyWarper>
        {!preview && (
          <MoreOptions
            options={[
              {
                label: `Editar ${room?.roomName}`,
                action: () => onRoomEdit?.(room as unknown as TRooms),
              },
            ]}
          />
        )}
      </Styled.HeaderContainer>
      {showChores && !preview && (
        <Styled.TaskWarper>
          <Styled.TasksContainer>
            {pendentTasks.map((chore) => {
              return (
                <Styled.ChoresCardContainer>
                  <Styled.ChoresCard
                    onClick={() => handleOpenTaskModal("edit", chore)}
                  >
                    <Styled.ChoresHeader>
                      <Styled.ChoresIcon color={room?.color}>
                        <FaBed />
                      </Styled.ChoresIcon>
                      <Styled.ChoresAvatar>
                        {chore.person[0].toUpperCase()}
                      </Styled.ChoresAvatar>
                    </Styled.ChoresHeader>
                    <Styled.ChoresTitle>{chore.task}</Styled.ChoresTitle>
                    <Styled.ChoresDue>
                      {chore.recurrent
                        ? EDays[chore.dueDay as keyof typeof EDays]
                        : moment(chore.dueDate).calendar(null, {
                            sameDay: "[Hoje]",
                            nextDay: "[Amanhã]",
                            nextWeek: "dddd",
                            lastDay: "[Ontem]",
                            lastWeek: "[Último] dddd",
                            sameElse: "MMMM D",
                          })}{" "}
                      as {chore.dueTime}
                    </Styled.ChoresDue>
                  </Styled.ChoresCard>
                  {!chore.recurrent && (
                    <Styled.CheckTask
                      onClick={() => {
                        setConfirmationType("done");
                        handleOpenTaskModal("confirm", chore);
                      }}
                    >
                      <FaCheck color="#ffffff" />
                    </Styled.CheckTask>
                  )}
                </Styled.ChoresCardContainer>
              );
            })}
          </Styled.TasksContainer>
          {doneTasks.length > 0 && (
            <Styled.DoneTasksTag>
              Comcluido{doneTasks.length > 1 && "s"}
            </Styled.DoneTasksTag>
          )}
          <Styled.TasksContainer>
            {doneTasks.map((chore) => {
              return (
                <Styled.ChoresCardContainer>
                  <Styled.ChoresCard done>
                    <Styled.ChoresHeader>
                      <Styled.ChoresIcon color={room?.color}>
                        <FaBed />
                      </Styled.ChoresIcon>
                      <Styled.ChoresAvatar>
                        {chore.person[0].toUpperCase()}
                      </Styled.ChoresAvatar>
                    </Styled.ChoresHeader>
                    <Styled.ChoresTitle>{chore.task}</Styled.ChoresTitle>
                    <Styled.ChoresDue>
                      {moment(chore.doneDate).calendar()}
                    </Styled.ChoresDue>
                  </Styled.ChoresCard>
                </Styled.ChoresCardContainer>
              );
            })}
          </Styled.TasksContainer>
          <Styled.AddTaskButton
            onClick={() => handleOpenTaskModal("new")}
            color={room?.color}
          >
            Adicionar Nova Atividade
          </Styled.AddTaskButton>
        </Styled.TaskWarper>
      )}
      <ModalNewTask
        display={showModal}
        close={() => setShowModal(false)}
        room={room}
        edit={taskEdit?.edit}
        taskData={taskEdit?.taskData}
        onCheckAsDone={(type) => {
          setConfirmationType(type);
          setShowConfirmationModal(true);
        }}
        onDelete={(type) => {
          setConfirmationType(type);
          setShowConfirmationModal(true);
        }}
      />
      <ModalConfirmation
        display={showConfirmationModal}
        close={() => setShowConfirmationModal(false)}
        task={taskEdit?.taskData || ([] as unknown as TChores)}
        room={room}
        confirmationType={confirmationType}
      />
    </Styled.Container>
  );
};

export default RoomCard;

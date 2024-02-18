import React, { FC, useState } from "react";
import { FaBed } from "react-icons/fa";

import * as Styled from "./styled";
import MoreOptions from "../MoreOptions";
import { generateUID } from "../../utils";
import { ref, set } from "firebase/database";
import { database } from "../../libs/Firebase";
import ModalNewTask from "../Modals/ModalNewTask";
import { useNavigate } from "react-router-dom";

type TChores = {
  id: string;
  task: string;
  person: string;
  dueDate: string;
  status: string;
  importance: string;
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
};
const RoomCard: FC<RoomCardProps> = ({ room, chores = [], preview }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showChores, setShowChores] = useState(false);

  const handleShowChores = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowChores((prev) => !prev);
  };

  const handleRoomMoreOptions = () => {
    alert("show");
    setShowChores((prev) => prev);
  };

  const addTask = () => {
    const taskID = generateUID(10);
    set(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${taskID}`), {
      id: taskID,
      task: "Lavar a louca",
      person: "Gilson",
      dueDate: "12/07/2024",
      status: "pedent",
      importance: "medium",
    })
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
  };

  console.log(room);

  return (
    <Styled.Container color={room?.color} expand={showChores && !preview}>
      <Styled.HeaderContainer>
        <Styled.IconWarper color={room?.color} onClick={handleShowChores}>
          <FaBed size={30} />
        </Styled.IconWarper>
        <Styled.BodyWarper onClick={handleShowChores}>
          <Styled.RoomTitle>{room?.roomName}</Styled.RoomTitle>
          <Styled.ActivitiesTag>
            {Object.values(room?.tasks || "").length} Atividade
            {chores.length > 1 ? "s" : ""}
          </Styled.ActivitiesTag>
        </Styled.BodyWarper>
        {!preview && (
          <MoreOptions
            options={[
              {
                label: `Editar ${room?.roomName}`,
                action: () => alert("roomName"),
              },
              {
                label: `Editar ${room?.roomName}`,
                action: () => alert("roomName"),
              },
            ]}
          />
        )}
      </Styled.HeaderContainer>
      {showChores && !preview && (
        <Styled.TaskWarper>
          <Styled.TasksContainer>
            {Object.values(room?.tasks || "").map((chore) => {
              return (
                <Styled.ChoresCard
                  onClick={() => navigate(`/task/${room?.id}/${chore.id}`)}
                >
                  <Styled.ChoresHeader>
                    <Styled.ChoresIcon color={room?.color}>
                      <FaBed />
                    </Styled.ChoresIcon>
                    <Styled.ChoresAvatar>
                      {chore.person[0].toUpperCase()}
                    </Styled.ChoresAvatar>
                    <Styled.ChoresMoreIcon>
                      <MoreOptions
                        options={[
                          {
                            label: `Editar ${chore.task}`,
                            action: () => alert("roomName"),
                          },
                        ]}
                      />
                    </Styled.ChoresMoreIcon>
                  </Styled.ChoresHeader>
                  <Styled.ChoresTitle>{chore.task}</Styled.ChoresTitle>
                  <Styled.ChoresDue>{chore.dueDate}</Styled.ChoresDue>
                </Styled.ChoresCard>
              );
            })}
          </Styled.TasksContainer>
          <Styled.AddTaskButton
            onClick={() => setShowModal(true)}
            color={room?.color}
          >
            Adicionar Nova task
          </Styled.AddTaskButton>
        </Styled.TaskWarper>
      )}
      <ModalNewTask
        display={showModal}
        close={() => setShowModal(false)}
        room={room}
      />
    </Styled.Container>
  );
};

export default RoomCard;

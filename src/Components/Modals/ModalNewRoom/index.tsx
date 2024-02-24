import React, { FC, useEffect, useState } from "react";

import * as Styled from "./styled";
import Modal from "../ModalBase";
import ColorSelector from "../../ColorSelector";
import { generateUID } from "../../../utils";
import { ref, remove, set } from "firebase/database";
import { database } from "../../../libs/Firebase";
import RoomCard from "../../RoomCard";
import { FaTrash } from "react-icons/fa";

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

type ModalNewRoomProps = {
  close: () => void;
  display?: boolean;
  room?: TRooms | undefined;
};

const ModalNewRoom: FC<ModalNewRoomProps> = ({ display, close, room }) => {
  const [roomName, setRoomName] = useState("");
  const [color, setColor] = useState("");
  const [edit, setEdit] = useState(false);

  const addRoom = () => {
    const roomID = generateUID(10);
    set(ref(database, `QNC8XseB4G/rooms/${roomID}`), {
      roomName: roomName,
      id: roomID,
      color: color,
      tasks: [],
    })
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
    close();
    setRoomName("");
    setColor("");
  };

  const editRoom = () => {
    if (room) {
      set(ref(database, `QNC8XseB4G/rooms/${room.id}`), {
        roomName: roomName,
        id: room.id,
        color: color,
        tasks: room.tasks || [],
      })
        .then((rooms) => rooms)
        .catch((err) => {
          throw new Error(err);
        });
      close();
      setRoomName("");
      setColor("");
    }
  };

  const handleDelete = () => {
    if (room) {
      remove(ref(database, `QNC8XseB4G/rooms/${room.id}`))
        .then((rooms) => rooms)
        .catch((err) => {
          throw new Error(err);
        });
      close();
      setRoomName("");
      setColor("");
    }
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (room) {
      setEdit(true);
      setRoomName(room.roomName);
      setColor(room.color);
    } else {
      setEdit(false);
      setRoomName("");
      setColor("");
    }
  }, [room]);

  const disabledButton = roomName.length < 2 || !color;

  return (
    <Modal display={display} close={handleClose}>
      <Styled.Container>
        <Styled.Header>
          <Styled.Text>{edit ? "Editar" : "Novo"} Comodo</Styled.Text>
          {Object.values(room?.tasks || "").length === 0 && (
            <Styled.DeleteIcon onClick={handleDelete}>
              <FaTrash />
            </Styled.DeleteIcon>
          )}
        </Styled.Header>
        <Styled.Label>Nome do Comodo</Styled.Label>
        <Styled.Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Styled.Label>Cor do Comodo</Styled.Label>
        <ColorSelector
          onColorSelect={(color) => setColor(color)}
          selected={color}
        />

        <Styled.Text>Preview</Styled.Text>
        <RoomCard
          preview
          room={{
            color: color,
            id: "kpCg5JIK7h",
            roomName: roomName,
            icon: "",
            tasks: [],
          }}
        />
        <Styled.Button
          onClick={edit ? editRoom : addRoom}
          disabled={disabledButton}
        >
          {edit ? "Editar" : "Adicionar Novo"} Comodo
        </Styled.Button>
      </Styled.Container>
    </Modal>
  );
};

export default ModalNewRoom;

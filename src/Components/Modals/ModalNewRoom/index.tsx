import React, { FC, useState } from "react";

import * as Styled from "./styled";
import Modal from "../ModalBase";
import ColorSelector from "../../ColorSelector";
import { generateUID } from "../../../utils";
import { ref, set } from "firebase/database";
import { database } from "../../../libs/Firebase";
import RoomCard from "../../RoomCard";

type ModalNewRoomProps = {
  close: () => void;
  display?: boolean;
};

const ModalNewRoom: FC<ModalNewRoomProps> = ({ display, close }) => {
  const [roomName, setRoomName] = useState("");
  const [color, setColor] = useState("");

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

  const handleClose = () => {
    setRoomName("");
    setColor("");
    close();
  };

  const disabledButton = roomName.length < 2 || !color;

  return (
    <Modal display={display} close={handleClose}>
      <Styled.Container>
        <Styled.Text>Novo Comodo</Styled.Text>
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
        <Styled.Button onClick={addRoom} disabled={disabledButton}>
          Adicionar Novo Comodo
        </Styled.Button>
      </Styled.Container>
    </Modal>
  );
};

export default ModalNewRoom;

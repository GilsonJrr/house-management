import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import RoomCard from "../../Components/RoomCard";
import { ref, set, get, DataSnapshot, onValue } from "firebase/database";
import { database } from "../../libs/Firebase";
import { generateUID } from "../../utils";
import ColorSelector from "../../Components/ColorSelector";
import Modal from "../../Components/Modals/ModalBase";
import ModalNewRoom from "../../Components/Modals/ModalNewRoom";
import { AddNewButton, ButtonBlur, ButtonContainer } from "./styled";

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

const Tasks = () => {
  const [roomName, setRoomName] = useState("");
  const [Color, setColor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState<TRooms[]>();

  useEffect(() => {
    get(ref(database, "QNC8XseB4G/rooms"))
      .then((rooms) => setRooms(Object.values(rooms.val()) as TRooms[]))
      .catch((err) => {
        throw new Error(err);
      });

    const dataRef = ref(database, "QNC8XseB4G/rooms");
    const onDataChange = (snapshot: { val: () => any }) => {
      const data = Object.values(snapshot.val() || []);
      setRooms(data as TRooms[]);
    };
    onValue(dataRef, onDataChange);
  }, []);

  const addRoom = () => {
    const roomID = generateUID(10);
    set(ref(database, `QNC8XseB4G/rooms/${roomID}`), {
      roomName: roomName,
      id: roomID,
      color: Color,
      tasks: [],
    })
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div>
      <Header
        title="Atividades"
        userPhoto="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg"
        userName="Gilson"
      />
      <div
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          marginBottom: 100,
        }}
      >
        {rooms?.map((room) => {
          return <RoomCard room={room} />;
        })}
      </div>
      {!showModal && (
        <ButtonContainer>
          <ButtonBlur />
          <AddNewButton onClick={() => setShowModal(true)}>
            Novo Comodo
          </AddNewButton>
        </ButtonContainer>
      )}
      <ModalNewRoom display={showModal} close={() => setShowModal(false)} />
    </div>
  );
};

export default Tasks;

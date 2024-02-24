import React, { FC, useEffect, useState } from "react";

import * as Styled from "./styled";
import Modal from "../ModalBase";
import { ref, remove, set } from "firebase/database";
import { database } from "../../../libs/Firebase";
import { GoAlertFill } from "react-icons/go";
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

type ModalConfirmationProps = {
  close: () => void;
  display?: boolean;
  task: TChores;
  room?: TRooms;
  confirmationType: "done" | "delete";
};

enum EConfirmation {
  "done" = "Comcluir",
  "delete" = "Deletar",
}

const ModalConfirmation: FC<ModalConfirmationProps> = ({
  display,
  close,
  task,
  room,
  confirmationType,
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleClose = () => {
    close();
  };

  const handleDone = () => {
    set(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${task?.id}`), {
      ...task,
      status: "done",
      doneDate: new Date(),
    })
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
    close();
  };

  const handleDelete = () => {
    remove(ref(database, `QNC8XseB4G/rooms/${room?.id}/tasks/${task?.id}`))
      .then((rooms) => rooms)
      .catch((err) => {
        throw new Error(err);
      });
    close();
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const timeoutId = setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isButtonDisabled]);

  return (
    <Modal display={display} close={handleClose}>
      <Styled.Container>
        {confirmationType === "delete" ? (
          <FaTrash size={35} color="#c25d5d" />
        ) : (
          <GoAlertFill size={40} color="#e0c769" />
        )}
        <Styled.Text>
          Tem certeza que deseja {EConfirmation[confirmationType]}
        </Styled.Text>
        <Styled.TaskName color={room?.color}>{task.task}</Styled.TaskName>

        <Styled.EditButtonContainer>
          {confirmationType === "delete" ? (
            <Styled.EditButton buttonType="delete" onClick={handleDelete}>
              Deletar
            </Styled.EditButton>
          ) : (
            <Styled.EditButton
              buttonType="done"
              onClick={handleDone}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "teste" : "Marcar como comcluido"}
            </Styled.EditButton>
          )}
          <Styled.EditButton buttonType="cancel" onClick={close}>
            voltar
          </Styled.EditButton>
        </Styled.EditButtonContainer>
      </Styled.Container>
    </Modal>
  );
};

export default ModalConfirmation;

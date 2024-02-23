import styled from "styled-components";

type Props = {
  color?: string;
  expand?: boolean;
  done?: boolean;
};

export const Container = styled.div<Props>`
  margin: ${({ expand }) => (expand ? "0" : "0 20")}px;
  background-color: ${({ color }) => color};
  padding: 15px;
  border-radius: 10px;
`;

export const HeaderContainer = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: ${({ expand }) => (expand ? "20" : "0")}px;
`;

export const IconWarper = styled.div<Props>`
  background-color: ${({ color }) => color};
  filter: brightness(130%);
  height: 50px;
  width: 50px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BodyWarper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 70%;
`;

export const RoomTitle = styled.h1`
  font-size: 22px;
  text-transform: capitalize;
`;

export const ActivitiesTag = styled.div`
  font-size: 14px;
  line-height: 18px;
  background-color: #f1f1f1;
  padding: 2px 8px 1px;
  border-radius: 10px;
`;

export const MoreWarper = styled.div`
  width: 10%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
`;

export const TasksContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  /* margin-top: 20px; */
  flex-wrap: wrap;
  align-items: center;
`;

export const ChoresCardContainer = styled.div`
  width: 48%;
  position: relative;
`;

export const CheckTask = styled.div`
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;
  height: 30px;
  width: 30px;
  background-color: #e8e8e8;
  border-radius: 10px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChoresCard = styled.div<Props>`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 10px;
  opacity: ${({ done }) => (done ? "0.6" : "1")};
  pointer-events: ${({ done }) => (done ? "none" : "all")};
`;

export const ChoresHeader = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
  margin-bottom: 10px;
  gap: 2px;
`;

export const ChoresIcon = styled.div`
  background-color: ${({ color }) => color};
  filter: brightness(112%);
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChoresAvatar = styled.div`
  background-color: #d9d9d9;
  height: 25px;
  width: 25px;
  border-radius: 100%;
  border: 2px solid salmon;
  display: flex;
  align-items: center;
  justify-content: center;
  color: salmon;
  font-size: 16px;
  font-weight: 800;
`;

export const ChoresMoreIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export const ChoresTitle = styled.h2`
  font-size: 18px;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  min-height: calc(1.2em * 3);
`;

export const ChoresDue = styled.div`
  margin-top: 10px;
  font-size: 12px;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  min-height: calc(1.2em * 2);
  margin-right: 30px;
`;

export const TaskWarper = styled.div``;

export const AddTaskButton = styled.button<Props>`
  background-color: ${({ color }) => color};
  filter: brightness(130%);
  border: none;
  outline: none;
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  margin-top: 12px;
`;

export const DoneTasksTag = styled.div`
  margin: 20px 0 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 600;
`;

import styled from "styled-components";

export const ModalBackGround = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const CloseTag = styled.div`
  background-color: #363434;
  width: 50px;
  height: 8px;
  border-radius: 10px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 22px;
  margin: 20px 0 20px 0;
`;

export const Container = styled.div`
  background-color: #ffff;
  border-radius: 20px 20px 0 0;
  margin-top: 20px;
  padding: 20px 20px 40px;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  width: 100%;
`;

export const ModalContainer = styled.div``;

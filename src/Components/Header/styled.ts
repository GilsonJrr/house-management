import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const IconWarper = styled.div`
  margin-top: 4px;
`;

export const Title = styled.h1`
  font-size: 25px;
`;

export const PhotoWarper = styled.div`
  background-color: #d9d9d9;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  border: 2px solid salmon;
  display: flex;
  align-items: center;
  justify-content: center;
  color: salmon;
  font-size: 20px;
  font-weight: 800;
`;

export const Photo = styled.img`
  width: 100%;
  border-radius: 100%;
`;

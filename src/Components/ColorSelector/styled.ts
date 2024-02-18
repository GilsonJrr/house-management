import styled from "styled-components";

type props = {
  color?: string;
  selected?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 22px;
  margin: 0 0 20px 0;
`;

export const ColorsContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 8px;
`;

export const Color = styled.div<props>`
  display: inline-block;
  background-color: ${({ color }) => color};
  width: 39px;
  height: 39px;
  border-radius: 100%;
  cursor: pointer;
  border: 3px solid ${({ selected }) => (selected ? "#000000" : "transparent")};
`;

import React, { FC } from "react";

import * as Styled from "./styled";

type ColorSelectorProps = {
  onColorSelect: (color: string) => void;
  selected: string;
};

const COLORS = [
  "#FFBE5E",
  "#DF3C26",
  "#FF5E5E",
  "#8BCD1F",
  "#1DDEC7",
  "#1DB0DE",
  "#1D6ADE",
  "#721DDE",
  "#CF1DDE",
  "#DE1D57",
];

const ColorSelector: FC<ColorSelectorProps> = ({ onColorSelect, selected }) => {
  return (
    <Styled.Container>
      <Styled.ColorsContainer>
        {COLORS.map((color) => {
          return (
            <Styled.Color
              color={color}
              onClick={() => onColorSelect(color)}
              selected={color === selected}
            />
          );
        })}
      </Styled.ColorsContainer>
    </Styled.Container>
  );
};

export default ColorSelector;

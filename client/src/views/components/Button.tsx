import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...rest }: ButtonProps) => (
  <Button.Wrapper {...rest}>{children}</Button.Wrapper>
);

Button.Wrapper = styled.button`
  background: none;
  cursor: pointer;
  width: max-content;
  padding: ${({
    theme: {
      spacing: { m, l },
    },
  }) => `${m} ${l}`};
  color: ${({ theme: { colors } }) => colors.brand};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.bold};
  border: 1px solid ${({ theme: { colors } }) => colors.brand};
  border-radius: ${({ theme: { borderRadius } }) => borderRadius.m};

  &:hover {
    color: ${({ theme: { colors } }) => colors.brandSecondary};
    border: 1px solid ${({ theme: { colors } }) => colors.brandSecondary};
  }
`;

export default Button;

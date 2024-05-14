import { useId } from "react";
import styled from "styled-components";

export type TextAreaProps = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  "data-testid"?: string;
};

export const TextArea = ({
  label,
  onChange,
  value,
  disabled,
  "data-testid": dataTestId,
}: TextAreaProps) => {
  const id = useId();

  return (
    <TextArea.Wrapper>
      <TextArea.Label htmlFor={id}>{label}</TextArea.Label>

      <TextArea.Input
        id={id}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        data-testid={dataTestId}
      />
    </TextArea.Wrapper>
  );
};

TextArea.Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

TextArea.Label = styled.label`
  font-weight: ${(props) => props.theme.fonts.weight.bold};
  color: ${(props) => props.theme.colors.primary};
  display: block;
`;

TextArea.Input = styled.textarea`
  display: block;
  margin-top: ${(props) => props.theme.spacing.s};
  outline: none;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.tertiary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  resize: none;
  font-size: 20px;
  width: 100%;
  flex-grow: 1;
  padding: ${(props) => props.theme.spacing.m};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

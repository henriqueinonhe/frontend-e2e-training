import { useId } from "react";
import styled from "styled-components";

export type TextInputProps = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  "data-testid"?: string;
};

export const TextInput = ({
  label,
  value,
  onChange,
  disabled,
  "data-testid": dataTestId,
}: TextInputProps) => {
  const id = useId();

  return (
    <TextInput.Wrapper>
      <TextInput.Label htmlFor={id}>{label}</TextInput.Label>

      <TextInput.Field
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        data-testid={dataTestId}
      />
    </TextInput.Wrapper>
  );
};

TextInput.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

TextInput.Label = styled.label`
  font-weight: ${(props) => props.theme.fonts.weight.bold};
  color: ${(props) => props.theme.colors.primary};
`;

TextInput.Field = styled.input`
  margin-top: ${(props) => props.theme.spacing.s};
  outline: none;
  background-color: ${(props) => props.theme.colors.tertiary};
  border: none;
  color: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  width: 100%;
  font-size: 24px;
`;

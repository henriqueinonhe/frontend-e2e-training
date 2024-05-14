import styled from "styled-components";
import { Modal } from "./Modal";
import { testIds } from "../helpers/testIds";

export type ConfirmationPromptProps = {
  prompt: string;
  onNo?: () => void;
  onYes?: () => void;
  "data-testid"?: string;
};

export const ConfirmationPrompt = ({
  prompt,
  onNo,
  onYes,
  "data-testid": dataTestId,
}: ConfirmationPromptProps) => {
  return (
    <Modal>
      <ConfirmationPrompt.Content data-testid={dataTestId}>
        <ConfirmationPrompt.Text>{prompt}</ConfirmationPrompt.Text>

        <ConfirmationPrompt.ButtonRow>
          <ConfirmationPrompt.NoButton
            data-testid={testIds.confirmationPromptNoButton(dataTestId)}
            onClick={onNo}
          >
            No
          </ConfirmationPrompt.NoButton>
          <ConfirmationPrompt.YesButton
            data-testid={testIds.confirmationPromptYesButton(dataTestId)}
            onClick={onYes}
          >
            Yes
          </ConfirmationPrompt.YesButton>
        </ConfirmationPrompt.ButtonRow>
      </ConfirmationPrompt.Content>
    </Modal>
  );
};

ConfirmationPrompt.Content = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.borderRadius.m};
  color: ${(props) => props.theme.colors.text};
`;

ConfirmationPrompt.Text = styled.div``;

ConfirmationPrompt.ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.l};
`;

ConfirmationPrompt.NoButton = styled.button`
  padding: ${(props) => props.theme.spacing.s}
    ${(props) => props.theme.spacing.l};
`;

ConfirmationPrompt.YesButton = styled.button`
  margin-left: ${(props) => props.theme.spacing.l};
  padding: ${(props) => props.theme.spacing.s}
    ${(props) => props.theme.spacing.l};
`;

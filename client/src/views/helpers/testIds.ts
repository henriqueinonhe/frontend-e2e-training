export const testIds = (() => {
  const addNoteButton = "add-note-button";

  const noteFormTitleInput = (dataTestId: string | undefined) =>
    dataTestId ? `${dataTestId}-title-input` : "";
  const noteFormTextInput = (dataTestId: string | undefined) =>
    dataTestId ? `${dataTestId}-text-input` : "";
  const noteFormCancelButton = (dataTestId: string | undefined) =>
    dataTestId ? `${dataTestId}-cancel-button` : "";
  const noteFormSaveButton = (dataTestId: string | undefined) =>
    dataTestId ? `${dataTestId}-submit-button` : "";

  const confirmationPromptNoButton = (dataTestId: string | undefined) =>
    dataTestId ? `${dataTestId}-no-button` : "";
  const confirmationPromptYesButton = (dataTestId: string | undefined) =>
    dataTestId ? `${dataTestId}-yes-button` : "";

  const addNoteForm = "add-note-form";
  const addNoteFormTitleInput = noteFormTitleInput(addNoteForm);
  const addNoteFormTextInput = noteFormTextInput(addNoteForm);
  const addNoteFormCancelButton = noteFormCancelButton(addNoteForm);
  const addNoteFormSaveButton = noteFormSaveButton(addNoteForm);
  const addNoteConfirmationPrompt = "add-note-confirmation-prompt";
  const addNoteConfirmationPromptNoButton = confirmationPromptNoButton(
    addNoteConfirmationPrompt,
  );
  const addNoteConfirmationPromptYesButton = confirmationPromptYesButton(
    addNoteConfirmationPrompt,
  );

  const notePreviewCard = (id: string) => `note-preview-card-${id}`;
  const notePreviewTitle = (id: string) => `note-preview-title-${id}`;
  const notePreviewSummary = (id: string) => `note-preview-summary-${id}`;

  const editNoteForm = "edit-note-form";
  const editNoteFormTitleInput = noteFormTitleInput(editNoteForm);
  const editNoteFormTextInput = noteFormTextInput(editNoteForm);
  const editNoteFormCancelButton = `${editNoteForm}-cancel-button`;
  const editNoteFormSaveButton = `${editNoteForm}-submit-button`;
  const editNoteConfirmationPrompt = "edit-note-confirmation-prompt";
  const editNoteConfirmationPromptNoButton = confirmationPromptNoButton(
    editNoteConfirmationPrompt,
  );
  const editNoteConfirmationPromptYesButton = confirmationPromptYesButton(
    editNoteConfirmationPrompt,
  );

  const loginEmailInput = "login-email-input";
  const loginPasswordInput = "login-password-input";
  const loginButton = "login-button";
  const loginNotice = "login-notice";

  const logoutButton = "logout-button";

  const headerTitle = "header-title";

  return {
    addNoteButton,
    addNoteForm,
    addNoteFormTitleInput,
    addNoteFormTextInput,
    addNoteFormCancelButton,
    addNoteFormSaveButton,
    notePreviewCard,
    notePreviewTitle,
    notePreviewSummary,
    editNoteForm,
    editNoteFormTitleInput,
    editNoteFormTextInput,
    editNoteFormCancelButton,
    editNoteFormSaveButton,
    noteFormTitleInput,
    noteFormTextInput,
    noteFormCancelButton,
    noteFormSaveButton,
    addNoteConfirmationPrompt,
    addNoteConfirmationPromptNoButton,
    addNoteConfirmationPromptYesButton,
    editNoteConfirmationPrompt,
    editNoteConfirmationPromptNoButton,
    editNoteConfirmationPromptYesButton,
    confirmationPromptNoButton,
    confirmationPromptYesButton,
    loginEmailInput,
    loginPasswordInput,
    loginButton,
    logoutButton,
    loginNotice,
    headerTitle,
  };
})();

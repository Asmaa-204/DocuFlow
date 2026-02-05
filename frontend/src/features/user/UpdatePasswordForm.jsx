import { useState } from "react";
import styled from "styled-components";
import { useUpdatePassword } from "./hooks/useUpdatePassword";
import { translator as t } from "@data/translations/ar";
import Button from "@components/Button";
import InputField from "@components/InputField";

const Form = styled.form`
  padding: 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2.4rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 1.2rem;
  padding-top: 2.4rem;
  border-top: 1px solid var(--color-grey-100);
`;

function UpdatePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { updatePassword, isUpdating } = useUpdatePassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;

    updatePassword({ oldPassword, newPassword }, {
      onSuccess: () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrid>
        <FieldWrapper>
          <Label htmlFor="oldPassword">{t.user.oldPassword}</Label>
          <InputField
            id="oldPassword"
            type="password"
            autoComplete="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isUpdating}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label htmlFor="newPassword">{t.user.newPassword}</Label>
          <InputField
            id="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isUpdating}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label htmlFor="confirmPassword">{t.user.confirmPassword}</Label>
          <InputField
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isUpdating}
          />
        </FieldWrapper>
      </FormGrid>

      <ActionRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }}
        >
          {t.actions.cancel}
        </Button>
        <Button disabled={isUpdating}>{t.user.changePassword}</Button>
      </ActionRow>
    </Form>
  );
}

export default UpdatePasswordForm;

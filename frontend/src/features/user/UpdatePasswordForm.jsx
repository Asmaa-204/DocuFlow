import { useState } from "react";
import styled from "styled-components";
import { useUpdatePassword } from "./hooks/useUpdatePassword";
import { translator as t } from "@data/translations/ar";
import Button from "@components/Button";
import InputField from "@components/InputField";

const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  margin-top: 2.4rem;
`;

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
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
            <FormRow>
                <Label>{t.user.oldPassword}</Label>
                <InputField
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow>
                <Label>{t.user.newPassword}</Label>
                <InputField
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow>
                <Label>{t.user.confirmPassword}</Label>
                <InputField
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow>
                <Button type="reset" $variation="secondary" disabled={isUpdating}>
                    {t.actions.cancel}
                </Button>
                <Button disabled={isUpdating}>{t.user.changePassword}</Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;

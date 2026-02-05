import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "@context/AuthContext";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { useUploadAvatar } from "./hooks/useUploadAvatar";
import { translator as t } from "@data/translations/ar";
import Button from "@components/Button";
import InputField from "@components/InputField";
import Row from "@components/Row";

const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
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

const FileInput = styled.input`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

function UpdateUserDataForm() {
    const { user } = useAuth();
    const { updateUser, isUpdating } = useUpdateUser();
    const { uploadAvatar, isUploading } = useUploadAvatar();

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (!firstName || !lastName || !email) return;
        updateUser({ firstName, lastName, email });
    }

    function handleAvatarChange(e) {
        const file = e.target.files[0];
        if (file) {
            uploadAvatar(file);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow>
                <Label>{t.user.firstName}</Label>
                <InputField
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow>
                <Label>{t.user.lastName}</Label>
                <InputField
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow>
                <Label>{t.user.email}</Label>
                <InputField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow>
                <Label>{t.user.profile}</Label>
                <FileInput
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                />
            </FormRow>

            <FormRow>
                <Button type="reset" $variation="secondary" disabled={isUpdating}>
                    {t.actions.cancel}
                </Button>
                <Button disabled={isUpdating}>{t.user.updateProfile}</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;

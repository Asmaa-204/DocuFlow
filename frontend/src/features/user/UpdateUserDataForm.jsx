import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "@context/AuthContext";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { useUploadAvatar } from "./hooks/useUploadAvatar";
import { translator as t } from "@data/translations/ar";
import Button from "@components/Button";
import InputField from "@components/InputField";
import { HiCamera } from "react-icons/hi2";
import { BASE_URL } from "@utils/consts";

const Form = styled.form`
  padding: 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 2rem;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--color-brand-100);
  transition: all 0.3s;

  &:hover {
    border-color: var(--color-brand-500);
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;

  ${AvatarWrapper}:hover & {
    filter: brightness(0.7);
  }
`;

const EditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.2);

  ${AvatarWrapper}:hover & {
    opacity: 1;
  }

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    margin-bottom: 0.4rem;
  }

  & span {
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const HiddenInput = styled.input`
  display: none;
`;

function UpdateUserDataForm() {
  const { user } = useAuth();
  const { updateUser, isUpdating } = useUpdateUser();
  const { uploadAvatar, isUploading } = useUploadAvatar();
  const fileInputRef = useRef();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const avatarSrc = user?.profilePicture
    ? `${BASE_URL}${user.profilePicture}`
    : "/default-user.jpg";

  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;
    updateUser({ firstName, lastName, email });
  }

  function handleAvatarClick() {
    fileInputRef.current.click();
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      uploadAvatar(file);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <AvatarContainer>
        <AvatarWrapper onClick={handleAvatarClick}>
          <AvatarImage src={avatarSrc} alt={user?.firstName} />
          <EditOverlay>
            <HiCamera />
            <span>{t.actions.edit}</span>
          </EditOverlay>
        </AvatarWrapper>
        <HiddenInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          disabled={isUploading}
        />
        <Label style={{ fontSize: "1.2rem", color: "var(--color-grey-400)" }}>
          انقر لتغيير الصورة
        </Label>
      </AvatarContainer>

      <FormGrid>
        <FieldWrapper>
          <Label htmlFor="firstName">{t.user.firstName}</Label>
          <InputField
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isUpdating}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label htmlFor="lastName">{t.user.lastName}</Label>
          <InputField
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isUpdating}
          />
        </FieldWrapper>

        <FieldWrapper style={{ gridColumn: "1 / -1" }}>
          <Label htmlFor="email">{t.user.email}</Label>
          <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            setFirstName(user?.firstName || "");
            setLastName(user?.lastName || "");
            setEmail(user?.email || "");
          }}
        >
          {t.actions.cancel}
        </Button>
        <Button disabled={isUpdating}>{t.user.updateProfile}</Button>
      </ActionRow>
    </Form>
  );
}

export default UpdateUserDataForm;

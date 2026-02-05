import { translator as t } from "@data/translations/ar";
import UpdateUserDataForm from "../features/user/UpdateUserDataForm";
import UpdatePasswordForm from "../features/user/UpdatePasswordForm";
import ActivityHistory from "../features/user/ActivityHistory";
import Heading from "@components/Heading";
import Row from "@components/Row";
import styled from "styled-components";

const StyledSettings = styled.div`
  padding: 4rem;
  max-width: 120rem;
  margin: 0 auto;
`;

function Settings() {
  return (
    <StyledSettings>
      <Row>
        <Heading as="h1">{t.navigation.settings}</Heading>
      </Row>

      <Row>
        <Heading as="h3">{t.user.updateProfile}</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">{t.user.changePassword}</Heading>
        <UpdatePasswordForm />
      </Row>

      <ActivityHistory />
    </StyledSettings>
  );
}

export default Settings;

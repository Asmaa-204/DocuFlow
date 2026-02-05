import { translator as t } from "@data/translations/ar";
import UpdateUserDataForm from "../features/user/UpdateUserDataForm";
import UpdatePasswordForm from "../features/user/UpdatePasswordForm";
import ActivityHistory from "../features/user/ActivityHistory";
import Heading from "@components/Heading";
import styled from "styled-components";

const StyledSettings = styled.div`
  padding: 4.8rem;
  max-width: 100rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

function Settings() {
  return (
    <StyledSettings>
      <Section>
        <SectionHeader>
          <Heading as="h2">{t.user.profile}</Heading>
        </SectionHeader>
        <UpdateUserDataForm />
      </Section>

      <Section>
        <SectionHeader>
          <Heading as="h2">{t.user.password}</Heading>
        </SectionHeader>
        <UpdatePasswordForm />
      </Section>

      <Section>
        <ActivityHistory />
      </Section>
    </StyledSettings>
  );
}

export default Settings;

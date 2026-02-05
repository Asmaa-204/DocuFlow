import styled from "styled-components";
import { useActivityHistory } from "./hooks/useActivityHistory";
import { translator as t } from "@data/translations/ar";
import Spinner from "@components/Spinner";
import Heading from "@components/Heading";

const StyledActivityHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const List = styled.ul`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 2.4rem;
  gap: 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ActionText = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-700);
`;

const DetailsText = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  line-height: 1.4;
`;

const TimeText = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-400);
  white-space: nowrap;
  margin-top: 0.2rem;
`;

const ACTION_MAP = {
    PROFILE_UPDATE: "تحديث الملف الشخصي",
    PASSWORD_CHANGE: "تغيير كلمة المرور",
    AVATAR_UPDATE: "تحديث الصورة الشخصية",
};

function ActivityHistory() {
    const { isLoading, activities } = useActivityHistory();

    if (isLoading) return <Spinner />;

    return (
        <StyledActivityHistory>
            <div>
                <Heading as="h2">{t.activity.history}</Heading>
            </div>

            <List>
                {activities?.length > 0 ? (
                    activities.map((activity) => (
                        <ListItem key={activity.id}>
                            <Content>
                                <ActionText>
                                    {ACTION_MAP[activity.action] || activity.action}
                                </ActionText>
                                {activity.details && (
                                    <DetailsText>
                                        {activity.action === "PROFILE_UPDATE" &&
                                            `تعديل: ${activity.details.firstName} ${activity.details.lastName} (${activity.details.email})`}
                                        {activity.action === "AVATAR_UPDATE" && "تم تحميل صورة جديدة"}
                                    </DetailsText>
                                )}
                            </Content>
                            <TimeText>
                                {new Date(activity.createdAt).toLocaleString("ar-EG", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </TimeText>
                        </ListItem>
                    ))
                ) : (
                    <ListItem style={{ justifyContent: "center", color: "var(--color-grey-400)" }}>
                        لا يوجد سجل نشاط متاح
                    </ListItem>
                )}
            </List>
        </StyledActivityHistory>
    );
}

export default ActivityHistory;

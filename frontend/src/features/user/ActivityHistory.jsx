import styled from "styled-components";
import { useActivityHistory } from "./hooks/useActivityHistory";
import { translator as t } from "@data/translations/ar";
import Spinner from "@components/Spinner";
import Heading from "@components/Heading";
import Row from "@components/Row";

const StyledActivityHistory = styled.div`
  margin-top: 4rem;
`;

const List = styled.ul`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const ActionText = styled.span`
  font-weight: 500;
  color: var(--color-grey-800);
`;

const TimeText = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const DetailsText = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-400);
  margin-top: 0.4rem;
`;

function ActivityHistory() {
    const { isLoading, activities } = useActivityHistory();

    if (isLoading) return <Spinner />;

    return (
        <StyledActivityHistory>
            <Row type="horizontal">
                <Heading as="h2">{t.activity.history}</Heading>
            </Row>

            <List>
                {activities?.map((activity) => (
                    <ListItem key={activity.id}>
                        <div>
                            <ActionText>{activity.action}</ActionText>
                            {activity.details && (
                                <DetailsText>{JSON.stringify(activity.details)}</DetailsText>
                            )}
                        </div>
                        <TimeText>{new Date(activity.createdAt).toLocaleString('ar-EG')}</TimeText>
                    </ListItem>
                ))}
            </List>
        </StyledActivityHistory>
    );
}

export default ActivityHistory;

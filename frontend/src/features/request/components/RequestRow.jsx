import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { formatDistanceToNow, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ar } from "date-fns/locale";

import Modal from "@components/Modal";
import Menus from "@components/Menu";
import Table from "@components/Table";
import Tag from "@components/Tag";
import ConfirmDelete from "@components/ConfirmDelete";
import { useAllWorkflows } from "@features/workflow";

import { translator as t } from "@data/translations/ar";

const Note = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function RequestRow({
  request: { id, workflowTitle, status, sentAt, updatedAt, instanceId },
}) {
  const navigate = useNavigate();
  const { data: workflows } = useAllWorkflows();

  const statusToTag = {
    pending: "blue",
    draft: "green",
    rejected: "red",
  };

  const workflowId = workflows?.find(
    (workflow) => workflow.title === workflowTitle
  )?.id;

  const dateToDisplay = status === "draft" ? updatedAt : sentAt;

  function handleEditRequest() {
    navigate(`/workflows/${workflowId}/instances/${instanceId}/request/${id}`);
  }

  return (
    <Table.Row>
      <p>{id}</p>
      <Note>{workflowTitle}</Note>

      <Tag $type={statusToTag[status]}>{t.status[status]}</Tag>
      <Info>
        <span>
          {formatDistanceToNow(new Date(dateToDisplay), {
            addSuffix: true,
            locale: ar,
          })}
        </span>
        <span>
          {format(new Date(dateToDisplay), "EEEE d MMMM yyyy, h:mm a", {
            locale: ar,
          })}
        </span>
      </Info>

      {status === "draft" && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button onClick={handleEditRequest} icon={<CiEdit />}>
                {t.actions.editRequest}
              </Menus.Button>

              <Modal.Open opens="delete-request">
                <Menus.Button icon={<HiTrash />}>
                  {t.actions.deleteRequest}
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete-request">
            <ConfirmDelete resourceName={t.request.request} />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default RequestRow;

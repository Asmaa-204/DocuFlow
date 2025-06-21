import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";

import { formatDistanceToNow, format } from "date-fns";

import Modal from "@components/Modal";
import Menus from "@components/Menu";
import Table from "@components/Table";
import Tag from "@components/Tag";
import ConfirmDelete from "@components/ConfirmDelete";

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

function RequestRow({ request: { id, note, status, createdAt } }) {
  const statusToTag = {
    pending: "blue",
    approved: "green",
    rejected: "red",
  };

  return (
    <Table.Row>
      <p>{id}</p>
      <Note>{note}</Note>

      <Tag $type={statusToTag[status]}>{status}</Tag>
      <Info>
        <span>{formatDistanceToNow(new Date(createdAt))} ago</span>
        <span>{format(new Date(createdAt), "MMM dd yyyy, HH:mm")}</span>
      </Info>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<CiEdit />}>Edit Request</Menus.Button>

            <Modal.Open opens="delete-request">
              <Menus.Button icon={<HiTrash />}>Delete request</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete-request">
          <ConfirmDelete resourceName="request" />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default RequestRow;

import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;

  &:last-of-type {
    flex: 1;
  }
`;

function RequestCard({ children, ...props }) {
  return <Card {...props}>{children}</Card>;
}

export default RequestCard;

import styled from "styled-components";

const ButtonsBox = styled.div`
  margin-top: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding-top: 12px;
`;

const Button = styled.button`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: var(--color-brand-500);
  padding: 8px 16px;
  cursor: pointer;
  color: #fff;
`;

function ActionButtons({ onReject, onAccept }) {
  return (
    <ButtonsBox>
      <Button onClick={onReject}>Reject</Button>
      <Button onClick={onAccept}>Accept</Button>
    </ButtonsBox>
  );
}

export default ActionButtons;

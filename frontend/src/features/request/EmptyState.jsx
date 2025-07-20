import styled from "styled-components";

const Empty = styled.div`
  display: flex;
  flex: 0.9;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`;

function EmptyState({ message = "Please select an item to read." }) {
  return (
    <Empty>
      <span>{message}</span>
    </Empty>
  );
}

export default EmptyState;

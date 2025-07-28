import styled from "styled-components";
import Row from "@components/Row";
import { format } from "date-fns";
import { useState } from "react";

const List = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
  height: calc((95vh - 2vh) * 0.8);
  width: 20vw;
`;


const ElementItem = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative; /* For the dropdown arrow positioning */

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0; /* Light grey hover effect */
  }

  /* Style for selected item (you'd add a class dynamically for this) */
  &.selected {
    background-color: #e6e6fa; /* Light purple for selected item */
    border-left: 4px solid #8a2be2; /* Purple bar on the left */
  }
`;

const ItemLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Title = styled.span`
  font-weight: 500;
  color: #555;
  margin-right: 10px;
  min-width: 80px; /* Ensure labels align */
`;

const SubTitle = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  color: #333;
  flex-grow: 1; /* Allow value to take remaining space */
  text-align: right;
  padding-top: 2px;
`;

function ScrollableList({ elements, setSelectedElement }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (element) => {
    setSelectedId(element.id);
    setSelectedElement(element);
  };

  return (
    <List>
      {elements.length === 0 ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "#888",
        }}>
          Empty
        </div>
      ) : (
        elements.map((element) => (
          SingleElement(element, selectedId, handleSelect)
        ))
      )}
    </List>
  );
}

function SingleElement(element, selectedId, handleSelect) {
  return <ElementItem
    key={element.id} // Essential for React list rendering
    className={selectedId == element.id ? "selected" : ""}
    onClick={() => handleSelect(element)}
  >
    <Row type="horizontal" style={{alignItems: "start"}}>
      <Title>{element.workflowTitle}</Title>
      <SubTitle>
        {format(new Date(element.createdAt), "dd/MM/yyyy")}
      </SubTitle>
    </Row>
    <ItemLine>
      <SubTitle>#{element.id}</SubTitle>
    </ItemLine>
  </ElementItem>;
}

export default ScrollableList;

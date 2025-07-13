import styled from "styled-components";
import Row from "@components/Row";
import Heading from "@components/Heading";

const Empty = styled.div`
  display: flex;
  flex: 0.9;
  justify-content: center;
  align-items: center;
  background-color: green;
  height: 100%;
  text-align: center;
`;

const Container = styled.div`
  flex: 0.9;
  height: 100%;
`;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;

  &:last-of-type {
    flex: 1;
  }
`;

const CardDiv = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  position: relative; /* For the dropdown arrow positioning */
  width: 100%;

  &:last-of-type {
    border-bottom: none;
  }
`;


function RequestDetails({ request }) {
  if (!request) {
    return (
      <Empty>
        <span>Please select an item to read.</span>
      </Empty>
    );
  }

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

	const heading = "h3";

	return (
		<Container>
			<Row type="vertical" style={{ height: "100%" }}>
				<Heading as="h1">Details</Heading>
				<Card>
					<CardDiv>
						<Heading as={heading}>{request.workflowTitle}</Heading>
					</CardDiv>
					<CardDiv>
						{/* <Heading as={heading}></Heading> */}
						<p> <b>Sender</b> {request.userId}</p>
					</CardDiv>
				</Card>
				<Card style={{ display: "flex", flexDirection: "column" }}>
					<CardDiv>
						<Heading as={heading}>Currently Attached Documents</Heading>
						<p>Shehab forgot to add files</p>
					</CardDiv>
					<CardDiv>
						<Heading as={heading}>Requested Documents</Heading>
						<p>I don't want files</p>
					</CardDiv>
					<CardDiv
						style={{
							display: "flex",
							flexDirection: "column",
							flex: 1,
							height: "100%",
						}}
					>
						<Heading as={heading}>Notes</Heading>
						<ButtonsBox>
							<Button>Reject</Button>
							<Button>Accept</Button>
						</ButtonsBox>
					</CardDiv>
				</Card>
			</Row>
		</Container>
	);
}

export default RequestDetails;

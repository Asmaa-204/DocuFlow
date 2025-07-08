import { useState, useMemo } from "react";
import { mockInstances } from "@data/mock_Instances";
import { mockWorkflows } from "@data/mock_workflows";
import WorkflowInstanceList from "@features/workflow/WorkflowInstanceList";
import Select from "@components/Select";
import Heading from "@components/Heading";
import Row from "@components/Row";

const ids = new Set(mockInstances.map(inst => inst.workflow_definition_id));
const workflowTypes = Array.from(ids).map(id => ({
	value: id,
	label: mockWorkflows[id]?.name || "Unknown"
}));

workflowTypes.unshift({ value: "", label: "All Workflows" });

console.log("Workflow Types:", workflowTypes);

function getFilteredInstances(selectedType) {
	if (!selectedType) return mockInstances;
	return mockInstances.filter(inst => inst.workflow_definition_id === selectedType);
}

// const

function MyWorkflows() {
	const [selectedType, setSelectedType] = useState("");
	const filteredInstances = useMemo(
		() => getFilteredInstances(selectedType),
		[selectedType]
	);

	function handleSearchChange(e) {
		setSelectedType(e.target.value);
	}

	return (
		<div>
			<Row type="horizontal">
				<Heading as="h1">My Workflows</Heading>

				<Select
					type="white"
					value={selectedType}
					onChange={handleSearchChange}
					options={workflowTypes}
				>
				</Select>
			</Row>
			<WorkflowInstanceList instances={filteredInstances} />
		</div>
	);
}

export default MyWorkflows;

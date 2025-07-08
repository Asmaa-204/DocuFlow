import { useState, useMemo } from "react";
import { mockInstances } from "@data/mock_Instances";
import { mockWorkflows } from "@data/mock_workflows";
import WorkflowInstanceList from "@features/workflow/WorkflowInstanceList";

const ids = new Set(mockInstances.map(inst => inst.workflow_definition_id));
const workflowTypes = Array.from(ids).map(id => ({
	id,
	name: mockWorkflows[id]?.name || "Unknown"
}));

function getFilteredInstances(selectedType) {
	if (!selectedType) return mockInstances;
	return mockInstances.filter(inst => inst.workflow_definition_id === selectedType);
}

function MyWorkflows() {
	const [selectedType, setSelectedType] = useState("");
	const filteredInstances = useMemo(
		() => getFilteredInstances(selectedType),
		[selectedType]
	);

	return (
		<div>
			<div>
				<select
					value={selectedType}
					onChange={e => setSelectedType(e.target.value)}
				>
					<option value="">All Workflows</option>
					{workflowTypes.map(wf => (
						<option key={wf.id} value={wf.id}>
							{wf.name}
						</option>
					))}
				</select>
			</div>
			<WorkflowInstanceList instances={filteredInstances} />
		</div>
	);
}

export default MyWorkflows;

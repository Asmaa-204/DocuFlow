import Select from "@components/Select";
import Heading from "@components/Heading";
import Row from "@components/Row";

function MyWorkflowHeaderOptions({ selectedType, handleFilterChange, instances, workflows }) {
  const ids = new Set(instances.map((inst) => inst.workflow_definition_id));

  const workflowTypes = Array.from(ids).map((id) => ({
    value: id,
    label: workflows[id]?.name || "Unknown",
  }));
  workflowTypes.unshift({ value: "", label: "All Workflows" });

  return (
    <Row type="horizontal">
      <Heading as="h1">My Workflows</Heading>
      <Select
        type="white"
        value={selectedType}
        onChange={handleFilterChange}
        options={workflowTypes}
      ></Select>
    </Row>
  );
}

export default MyWorkflowHeaderOptions;

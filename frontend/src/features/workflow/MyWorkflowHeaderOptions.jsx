import Select from "@components/Select";
import Heading from "@components/Heading";
import Row from "@components/Row";

function MyWorkflowHeaderOptions({
  selectedType,
  handleFilterChange,
  instances,
  workflowsMap,
  isPending,
}) {
    function Component({ types }) {
    return (
      <Row type="horizontal">
        <Heading as="h1">My Workflows</Heading>
        <Select
          type="white"
          value={selectedType}
          onChange={handleFilterChange}
          options={types}
        ></Select>
      </Row>
    );
  }

  if (isPending) {
    const types = [{ value: "", label: "All Workflows" }];
    return <Component types={types} />;
  }

  const ids = new Set(instances.map((inst) => inst.workflowId));

  const workflowTypes = Array.from(ids).map((id) => ({
    value: id,
    label: workflowsMap[id]?.title || "Unknown",
  }));
  workflowTypes.unshift({ value: "", label: "All Workflows" });

  return <Component types={workflowTypes} />;
}

export default MyWorkflowHeaderOptions;

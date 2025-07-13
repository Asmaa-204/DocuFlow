import { useMemo } from "react";
import Select from "@components/Select";
import Heading from "@components/Heading";
import Row from "@components/Row";

/**
 * Header component for My Workflows page
 * Contains title and workflow type filter dropdown
 */
function MyWorkflowHeaderOptions({
  selectedType,
  handleFilterChange,
  instances = [],
  workflowsMap = {},
  isPending = false,
}) {
  // Memoize workflow options to prevent recalculation on every render
  const workflowOptions = useMemo(() => {
    if (isPending || !instances.length) {
      return [{ value: "", label: "All Workflows" }];
    }

    // Get unique workflow IDs from instances
    const uniqueWorkflowIds = new Set(instances.map((inst) => inst.workflowId));

    // Create options from unique IDs
    const options = Array.from(uniqueWorkflowIds).map((id) => ({
      value: id,
      label: workflowsMap[id]?.title || `Workflow ${id}`,
    }));

    // Sort options alphabetically and add "All Workflows" at the beginning
    options.sort((a, b) => a.label.localeCompare(b.label));
    options.unshift({ value: "", label: "All Workflows" });

    return options;
  }, [instances, workflowsMap, isPending]);

  return (
    <Row type="horizontal">
      <Heading as="h1">My Workflows</Heading>
      <Select
        type="white"
        value={selectedType}
        onChange={handleFilterChange}
        options={workflowOptions}
        disabled={isPending}
      />
    </Row>
  );
}

export default MyWorkflowHeaderOptions;

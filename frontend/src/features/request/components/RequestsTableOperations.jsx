import SortBy from "@components/SortBy";
import Filter from "@components/Filter";
import TableOperations from "@components/TableOperations";

import { sortOptions, filterOptions } from "../data/filters.js";

function RequestsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterBy="status"
        options={filterOptions}
        resetParams={[{ name: "page", value: 1 }]}
      />

      <SortBy
        options={sortOptions}
      />
    </TableOperations>
  );
}

export default RequestsTableOperations;

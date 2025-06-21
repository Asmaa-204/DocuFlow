import SortBy from "@components/SortBy";
import Filter from "@components/Filter";
import TableOperations from "@components/TableOperations";

function RequestsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterBy="status"
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "confirmed", label: "Confirmed" },
          { value: "rejected", label: "Rejected" },
        ]}
        resetParams={[{ name: "page", value: 1 }]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default RequestsTableOperations;

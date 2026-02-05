import { apiRequest } from "@utils/api";

async function getMyRequests({ isDraft, status, sortBy }) {
  const token = localStorage.getItem("token");

  // Build query parameters
  const params = new URLSearchParams();
  params.append("type", "sent");

  // Handle page-level filter (draft vs submitted)
  if (isDraft) {
    // Draft page: always show only drafts
    params.append("status", "draft");
  } else {
    // Submitted page: show non-draft requests only
    if (status && status !== "all") {
      // Apply specific status filter (pending, approved, rejected)
      params.append("status", status);
    }
    // Note: When showing submitted requests without a specific status filter,
    // we rely on the page-level filter to distinguish drafts from submitted.
    // The draft page uses filter="draft" and this branch uses filter="submitted".
  }

  // Add sort parameter
  if (sortBy) {
    const [field, direction] = sortBy.split("-");
    // Map frontend field names to database columns
    const sortField = field === "startDate" ? "createdAt" : field;
    const sortDirection = direction === "asc" ? "" : "-";
    params.append("sort", `${sortDirection}${sortField}`);
  }

  const data = await apiRequest(`/me/request?${params.toString()}`, {
    method: "GET",
    token,
  });
  return data.data?.requests;
}

export { getMyRequests };

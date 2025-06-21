import { useSearchParams } from "react-router-dom";
import Select from "@components/Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams?.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      type="white"
      value={sortBy}
      options={options}
      handleChange={handleChange}
    />
  );
}

export default SortBy;

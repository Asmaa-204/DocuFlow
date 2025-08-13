import Tag from "@components/Tag";
import { IoCheckmark, IoCloseOutline, IoTimeOutline } from "react-icons/io5";

const statusToTag = {
  pending: { color: "blue", icon: <IoTimeOutline size={14} /> },
  approved: { color: "green", icon: <IoCheckmark size={14} /> },
  rejected: { color: "red", icon: <IoCloseOutline size={14} /> },
};

function RequestTag({ status, version = "text" }) {
  return (
    <Tag $version={version} $type={statusToTag[status].color}>
      {version === "text" ? status : statusToTag[status].icon}
    </Tag>
  );
}

export default RequestTag;

import { translator as t } from "@data/translations/ar";

function Empty({ resource }) {
  return (
    <p>
      {t.general.empty} {resource}
    </p>
  );
}

export default Empty;

import { useMemo } from "react";
import { ACCEPTS } from "./consts";
import FileType from "./FileType.type";

const useAccept = (type: FileType) => {
    const accept = useMemo(() => ACCEPTS[type] ? "." + ACCEPTS[type].join(", .") : "", [type]);

    return accept;
}

export default useAccept;
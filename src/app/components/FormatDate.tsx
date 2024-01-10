import { parseISO, format } from "date-fns";
import ScheduleIcon from "@mui/icons-material/Schedule";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DateProps } from "~/lib/type";

const FormatDate = ({ article, dateName }: DateProps) => {
  const transCreated: Date = parseISO(article.createdAt);
  const formatCreated: string = format(transCreated, "MMMM dd, yyyy HH:mm");
  const transUpdated: Date = parseISO(article.updatedAt);
  const formatUpdated: string = format(transUpdated, "MMMM dd, yyyy HH:mm");

  if (dateName === "created") {
    return (
      <div className="flex justify-end text-gray-500">
        <ScheduleIcon fontSize="small" />
        <span className="text-right text-xs w-36">{formatCreated}</span>
      </div>
    );
  } else if (dateName === "updated" && formatCreated !== formatUpdated) {
    return (
      <div className="flex justify-end text-gray-500">
        <RefreshIcon fontSize="small" />
        <span className="text-right text-xs w-36">{formatUpdated}</span>
      </div>
    );
  } else if (dateName === "updated" && formatCreated === formatUpdated) {
    return;
  }
};

export default FormatDate;

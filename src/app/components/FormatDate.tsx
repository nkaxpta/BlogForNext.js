import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ScheduleIcon from "@mui/icons-material/Schedule";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DateProps } from "~/lib/type";

const FormatDate = ({ article, dateName }: DateProps) => {
  const transCreated: Date = utcToZonedTime(article.createdAt, "Asia/Tokyo");
  const formatCreated: string = format(transCreated, "MMMM dd, yyyy HH:mm");
  const transUpdated: Date = utcToZonedTime(article.updatedAt, "Asia/Tokyo");
  const formatUpdated: string = format(transUpdated, "MMMM dd, yyyy HH:mm");

  if (dateName === "created") {
    return (
      <div className="flex justify-end text-gray-500 text-right text-xs">
        <span>
          <ScheduleIcon fontSize="small" /> {formatCreated}
        </span>
      </div>
    );
  } else if (dateName === "updated" && formatCreated !== formatUpdated) {
    return (
      <div className="flex justify-end text-gray-500 text-right text-xs">
        <span>
          <RefreshIcon fontSize="small" /> {formatUpdated}
        </span>
      </div>
    );
  } else if (dateName === "updated" && formatCreated === formatUpdated) {
    return;
  }
};

export default FormatDate;

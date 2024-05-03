import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ScheduleIcon from "@mui/icons-material/Schedule";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DateProps } from "~/lib/type";

const FormatDate = ({ article, dateName }: DateProps) => {
  const transPublished: Date = utcToZonedTime(
    article.publishedAt,
    "Asia/Tokyo"
  );
  const formatPublished: string = format(transPublished, "MMMM dd, yyyy HH:mm");
  const transRevised: Date = utcToZonedTime(article.revisedAt, "Asia/Tokyo");
  const formatRevised: string = format(transRevised, "MMMM dd, yyyy HH:mm");

  if (dateName === "published") {
    return (
      <div className="flex justify-end text-gray-500 text-right text-xs">
        <span>
          <ScheduleIcon fontSize="small" /> {formatPublished}
        </span>
      </div>
    );
  } else if (dateName === "revised" && formatPublished !== formatRevised) {
    return (
      <div className="flex justify-end text-gray-500 text-right text-xs">
        <span>
          <RefreshIcon fontSize="small" /> {formatRevised}
        </span>
      </div>
    );
  } else if (dateName === "revised" && formatPublished === formatRevised) {
    return;
  }
};

export default FormatDate;

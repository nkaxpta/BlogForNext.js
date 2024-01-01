import Link from "next/link";
import { ArticleProps } from "../../../lib/type";
import Categories from "./Categories";
import FormatDate from "./FormatDate";

const ArticleItem = ({ article }: ArticleProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 justify-center">
      <Link href={`/Articles/Post/${article.id}`}>
        <img
          src={article.thumbnail.url}
          alt=""
          className="thumbnail-img rounded-lg"
        />
        <h1 className=" hover:underline text-xl md:text-x1 mb-3 font-semibold text-center border-b-2">
          {article.title}
        </h1>
      </Link>
      <Categories article={article} />
      <FormatDate article={article} dateName="created" />
      <FormatDate article={article} dateName="updated" />
    </div>
  );
};

export default ArticleItem;

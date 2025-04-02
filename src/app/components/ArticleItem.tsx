import Link from "next/link";
import Image from "next/image";
import { ArticleProps } from "~/lib/type";
import Categories from "./Categories";
import FormatDate from "./FormatDate";
import { OG_IMAGE_DIR_URL } from "~/constants/constants";

const ArticleItem = ({ article }: ArticleProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 justify-center">
      <Link href={`/Articles/Post/${article.id}`}>
        <Image
          src={`${OG_IMAGE_DIR_URL}/${article.id}.png`}
          height={250}
          width={650}
          alt=""
          className="thumbnail-img rounded-lg"
        />
        {/* <h1 className=" hover:underline text-xl md:text-x1 mb-3 font-semibold text-center border-b-2">
          {article.title}
        </h1> */}
      </Link>
      <Categories article={article} />
      <FormatDate article={article} dateName="published" />
      <FormatDate article={article} dateName="revised" />
    </div>
  );
};

export default ArticleItem;

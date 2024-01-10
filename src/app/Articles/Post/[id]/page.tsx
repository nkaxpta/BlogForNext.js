import Article from "./Article";
import { getArticlesList, getDetailArticle } from "~/lib/client";
import { Back } from "@/components/Back";
import BlogCategory from "@/components/BlogCategory";
import Profile from "@/components/ProfileAside";
import Outline from "@/components/Outline";
import { Metadata } from "next";
import { Article as ArticleType } from "~/lib/type";

export const generateStaticParams = async () => {
  const { contents } = await getArticlesList();

  return contents.map((article: ArticleType) => ({
    id: article.id,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const article = await getDetailArticle(params.id);

  // console.log("url：%s", process.env.BLOG_DOMAIN);

  // サイト説明は概要内の最初の一文
  return {
    metadataBase: new URL(
      `https://${process.env.BLOG_DOMAIN}` || "localhost:3000"
    ),
    title: article.title,
    description: article.content.split("</h2><p>")[1].split("</p>")[0],
    openGraph: {
      title: article.title,
      description: article.content.split("</h2><p>")[1].split("</p>")[0],
      url: `https://${process.env.BLOG_DOMAIN}/Articles/Post/${article.id}/`,
    },
  };
};

// paramsはurlのid部分を出力する
const Page = async ({ params }: { params: { id: string } }) => {
  // console.log(params);
  const article: ArticleType = await getDetailArticle(params.id);
  // console.log(article);
  // console.log(article.content);

  // 記事内にh2,h3,h4,h5タグがあるときにtrue,falseを返す
  const outlineWords = ["<h2", "<h3", "<h4", "<h5"];
  const isIncludes = (arr: string[], content: string): boolean => {
    return arr.some((e) => content.includes(e));
  };

  // console.log(isIncludes(outlineWords, article.content));

  return (
    <div className="md:flex min-h-screen ">
      <div className="flex-grow flex-col w-full md:w-2/3">
        <article className="mx-2 md:ml-10 body">
          <div className="mb-6">
            <Back />
          </div>
          <Article article={article} />
        </article>
      </div>
      <div className="w-full md:w-1/3 flex flex-col px-3 lg:pl-6">
        <Profile />
        <div className="sticky top-16">
          {/* 目次に該当するタグが存在する場合のみ目次欄を表示 */}
          {isIncludes(outlineWords, article.content) && <Outline />}
          <BlogCategory />
        </div>
      </div>
    </div>
  );
};

export default Page;

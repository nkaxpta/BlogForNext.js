import { getArticleByPage, getNumberOfPages } from "../../../../../lib/client";
import BlogCategory from "@/app/components/BlogCategory";
import { Pagination } from "@/app/components/Pagination";
import Profile from "@/app/components/ProfileAside";
import { Metadata } from "next";
import ArticleItem from "@/app/components/ArticleItem";
import { Article } from "../../../../../lib/type";

export const metadata: Metadata = {
  title: "All Posts",
};

// paramsの生成
export const generateStaticParams = async () => {
  const numberOfPage: number = await getNumberOfPages();
  const pageObjArr = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pageObjArr.push({ page: i.toString() });
  }

  return pageObjArr;
};

const blogPageList = async ({ params }: { params: { page: number } }) => {
  // paramsはディレクトリ名が[~]となっているときに有効で、URLの中で[]の中身に位置する値を取得する
  // console.log("ぱらむず：%o", params);

  const xArticlesList = await getArticleByPage({ params });
  const numberOfPage: number = await getNumberOfPages();

  // articlesListは全記事のAPI情報のこと
  // console.log("えっくすあーてぃくるりすと：%o", xArticlesList);

  return (
    <div className="md:flex min-h-screen gap-y-8">
      <div className="flex-grow flex-col w-full md:w-2/3 items-center">
        <h2 className="text-2xl my-8 text-center">All Posts</h2>
        <article className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 sm:px-14 md:px-0">
          {xArticlesList.map((article: Article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </article>
        <Pagination
          pageNumber={parseInt(params.page.toString(), 10)}
          totalCount={numberOfPage}
          prefixUrl="/Articles/page"
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col px-3 lg:pl-6">
        <Profile />
        <BlogCategory />
      </div>
    </div>
  );
};

export default blogPageList;

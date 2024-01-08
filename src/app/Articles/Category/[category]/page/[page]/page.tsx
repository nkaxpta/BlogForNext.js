import {
  getArticlesList,
  getAllCategories,
  getArticleByCategoryAndPage,
  getNumberOfPagesByCategory,
  getCategoryName,
} from "../../../../../../../lib/client";
import BlogCategory from "@/app/components/BlogCategory";
import { Pagination } from "@/app/components/Pagination";
import { ArrayObject, Article } from "../../../../../../../lib/type";
import Profile from "@/app/components/ProfileAside";
import ArticleItem from "@/app/components/ArticleItem";

// paramsの生成
export const generateStaticParams = async () => {
  const categoryObj = await getAllCategories();
  // console.log("おーるかてごりー：%o", categoryObj);

  let pageObjArr: ArrayObject[] = [];

  // カテゴリーが小文字なら上手くいく
  // 非同期処理の並列実行
  await Promise.all(
    Object.keys(categoryObj).map((category: string) => {
      return getNumberOfPagesByCategory(category).then(
        (numberOfPage: number) => {
          for (let i = 1; i <= numberOfPage; i++) {
            pageObjArr.push({
              category: category.toLowerCase(),
              page: i.toString(),
            });
          }
        }
      );
    })
  );

  // console.log("ぺーじおぶじぇくと：%o", pageObjArr);

  return pageObjArr;
};

// ページタイトル生成
export const generateMetadata = async ({
  params,
}: {
  params: { category: string };
}) => {
  const allList = await getArticlesList();
  const categoryArticles = allList.contents.filter((article: Article) =>
    article.categories.find(
      (category: string) => category.toLowerCase() === params.category
    )
  );

  const categoryName = getCategoryName(
    { params },
    categoryArticles[0].categories
  );

  return { title: `Category Posts : ${categoryName}` };
};

const blogCategoryPageList = async ({
  params,
}: {
  params: { category: string; page: number };
}) => {
  // paramsはディレクトリ名が[~]となっているときに有効で、URLの中で[]の中身に位置する値を取得する
  // console.log("ぱらむず：%o", params);

  const articles = await getArticleByCategoryAndPage({ params });
  // console.log("たぐあーてぃくる2：%o", articles[0].categories);

  const categoryName = getCategoryName({ params }, articles[0].categories);
  // console.log(categoryName);

  const numberOfPageByCategory: number = await getNumberOfPagesByCategory(
    params.category
  );

  return (
    <div className="md:flex min-h-screen gap-y-8">
      <div className="flex-grow flex-col w-full md:w-2/3 items-center">
        <h2 className="text-2xl my-8 text-center">
          Category Posts : {categoryName}
        </h2>
        <article className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 sm:px-14 md:px-0">
          {articles.map((article: Article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </article>
        <Pagination
          pageNumber={parseInt(params.page.toString(), 10)}
          totalCount={numberOfPageByCategory}
          prefixUrl={`/Articles/Category/${params.category}/page`}
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col px-3 lg:pl-6">
        <Profile />
        <BlogCategory />
      </div>
    </div>
  );
};

export default blogCategoryPageList;

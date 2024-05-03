import { Article, categoryType } from "./type";
import { MicroCMSQueries, createClient } from "microcms-js-sdk";
import { NUMBER_OF_ARTICLES_PER_PAGE } from "../constants/constants";
import { notFound } from "next/navigation";

const envObj = {
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
};

export const client = createClient(envObj);

// ----------------------------------------------
// ブログ一覧を取得
// ----------------------------------------------
export const getArticlesList = async () => {
  const articlesList = await client.getList<Article>({
    endpoint: "blog",
  });

  return articlesList;
};

// ----------------------------------------------
// ブログ一覧をpageSizeごとに分割し取得
// ----------------------------------------------
export const getXArticlesList = async (pageSize: number) => {
  const allList = await getArticlesList();
  const xArticlesList = allList.contents.slice(0, pageSize);

  return xArticlesList;
};

// ----------------------------------------------
// ページ番号に応じた記事を取得
// ----------------------------------------------
export const getArticleByPage = async ({
  params,
}: {
  params: { page: number };
}) => {
  const allList = await getArticlesList();

  const startIndex = (params.page - 1) * NUMBER_OF_ARTICLES_PER_PAGE;
  const endIndex = params.page * NUMBER_OF_ARTICLES_PER_PAGE;

  return allList.contents.slice(startIndex, endIndex);
};

// ----------------------------------------------
// ブログ詳細を取得
// ----------------------------------------------
export const getDetailArticle = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailArticle = await client
    .getListDetail<Article>({
      endpoint: "blog",
      contentId,
      queries,
    })
    .catch(async () => {
      // refetch with fetch API to get HTTP status code
      const { status, ok } = await fetch(
        `https://${envObj.serviceDomain}.microcms.io/api/v1/blog/${envObj.apiKey}`,
        { headers: { "API-KEY": envObj.apiKey } }
      );

      switch (status) {
        case 404:
          console.log("たぶん404：%s, おっけー：%s", status, ok);
          return notFound();
        default:
          console.log("すてーたす：%s, おっけー：%s", status, ok);
          throw new Error("エラーが発生しました。");
      }
    });

  return detailArticle;
};

// ----------------------------------------------
// 全記事からページ数を計算
// ----------------------------------------------
export const getNumberOfPages = async () => {
  const allList = await getArticlesList();

  return Math.ceil(allList.contents.length / NUMBER_OF_ARTICLES_PER_PAGE);
};

// ----------------------------------------------
// カテゴリーとページ番号に応じた記事を取得
// ----------------------------------------------
export const getArticleByCategoryAndPage = async ({
  params,
}: {
  params: { category: string; page: number };
}) => {
  // console.log("ぱらむず：%o", params);

  const allList = await getArticlesList();
  const articles = allList.contents.filter((article: Article) =>
    // article.categories.includes(initCharUpper)
    article.categories.find(
      (category: string) => category.toLowerCase() === params.category
    )
  );

  // console.log("かてごりー：%s", params.category);
  // console.log("たぐあーてぃくる：%o", articles);

  const startIndex = (params.page - 1) * NUMBER_OF_ARTICLES_PER_PAGE;
  const endIndex = params.page * NUMBER_OF_ARTICLES_PER_PAGE;

  return articles.slice(startIndex, endIndex);
};

// ----------------------------------------------
// カテゴリー別記事からページ数を計算
// ----------------------------------------------
export const getNumberOfPagesByCategory = async (categoryName: string) => {
  const allList = await getArticlesList();

  const articles = allList.contents.filter((article: Article) =>
    article.categories.find(
      (category: string) =>
        category.toLowerCase() === categoryName || category === categoryName
    )
  );

  // console.log("かてごりーあーてぃくる：%o", articles);

  return Math.ceil(articles.length / NUMBER_OF_ARTICLES_PER_PAGE);
};

// ----------------------------------------------
// 記事のカテゴリーをすべて取得
// ----------------------------------------------
export const getAllCategories = async () => {
  const allList = await getArticlesList();

  // flatMapでmapで回しつつ配列のネストを統一
  const allCategoriesDuplication = allList.contents.flatMap(
    (article: Article) => article.categories
  );
  // console.log("おーるかてごりー：%s", allCategoriesDuplication);

  const categoryObj: categoryType = {};

  for (const item of allCategoriesDuplication) {
    if (categoryObj[item]) {
      categoryObj[item]++;
    } else {
      categoryObj[item] = 1;
    }
  }

  return categoryObj;
};

// ----------------------------------------------
// カテゴリー別記事のカテゴリー名を取得
// ----------------------------------------------
export const getCategoryName = (
  { params }: { params: { category: string } },
  categories: string[]
) => {
  const array: (string | undefined)[] = categories.map((category) => {
    if (params.category === category.toLowerCase()) {
      return category;
    }
    return undefined;
  });

  // undefined排除処理
  const categoryArr = array.filter((e) => e);
  // console.log(categoryArr);

  return categoryArr[0];
};

// ----------------------------------------------
// 直近の記事をsize分だけ取得
// ----------------------------------------------
export const getRecentlyArticles = async () => {
  const allList = await getArticlesList();

  const articleArr: Article[] = allList.contents.map(
    (article: Article) => article
  );

  const size: number = 3;
  const recentlyArticles: Article[] = articleArr
    .sort((article1, article2) => {
      return article1.publishedAt > article2.publishedAt ? -1 : 1;
    })
    .slice(0, size);

  return recentlyArticles;
};

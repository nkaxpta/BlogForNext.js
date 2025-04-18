import { z } from "zod";

const zArticle = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.string().datetime(),
  revisedAt: z.string().datetime(),
  categories: z.array(z.string()),
});

export type Article = z.infer<typeof zArticle>;

export type ArticleProps = {
  article: Article;
};

export type categoryType = {
  [key: string]: number;
};

export type ArrayObject = {
  category: string;
  page: string;
};

export type CodeProps = {
  language?: string;
  code: string;
  filename?: string;
};

export type DateProps = {
  article: Article;
  dateName?: string;
};

export type paginationProps = {
  pageNumber: number;
  totalCount: number;
  prefixUrl: string;
};

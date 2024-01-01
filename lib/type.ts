import { z } from "zod";

const zArticle = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  categories: z.array(z.string()),
  thumbnail: z.object({
    url: z.string().url(),
  }),
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

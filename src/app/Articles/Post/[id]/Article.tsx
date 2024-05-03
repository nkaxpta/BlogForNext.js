"use client";

import React, { useEffect } from "react";
import parseContent from "~/lib/codeblock";
import FormatDate from "@/components/FormatDate";
import Categories from "@/components/Categories";
import { ArticleProps } from "~/lib/type";

import styles from "./styles/article.module.scss";

const Article = ({ article }: ArticleProps) => {
  // console.log("ぱーす：%s", parse(article.content));
  // console.log("あーてぃくる：%o", article);

  useEffect(() => {
    const iframely: any = (window as any).iframely;
    // console.log(iframely);

    if (iframely) {
      iframely.load();
      // console.log("ロードされました");
    }
  }, []);

  const contentWithCodeBlocks = parseContent({ article });

  return (
    <div className="bg-gray-100 rounded-lg p-8 gap-2.5">
      <h1 className="text-2xl md:text-xi font-semibold border-b border-blue-500">
        {article.title}
      </h1>
      <Categories article={article} />
      <FormatDate article={article} dateName="created" />
      <FormatDate article={article} dateName="updated" />
      <div className={styles.main}>{contentWithCodeBlocks}</div>
    </div>
  );
};

export default Article;

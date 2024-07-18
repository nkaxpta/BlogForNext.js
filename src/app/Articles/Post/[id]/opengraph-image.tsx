import { ImageResponse } from "next/og";
import { Article as ArticleType } from "~/lib/type";
import { getDetailArticle, getArticlesList } from "~/lib/client";
import { BLOG_TITLE } from "~/constants/constants";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
// export const dynamic = "force-dynamic";
// export const dynamicParams = true;

export const generateStaticParams = async () => {
  const { contents } = await getArticlesList();

  return contents.map((article: ArticleType) => ({
    id: article.id,
  }));
};

export default async function Image({ params }: { params: { id: string } }) {
  const article: ArticleType = await getDetailArticle(params.id);

  console.log(article.title);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundImage: "linear-gradient(135deg, #7dc7f8 10%, #027cd9 100%)",
          color: "#f3f3f3",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "3rem 4rem 2.5rem",
            backgroundColor: "#181b29",
            justifyContent: "space-between",
            borderRadius: "10px",
            width: "100%",
            height: "90%",
          }}
        >
          <p style={{ fontSize: 55, fontWeight: 700 }}>{article.title}</p>
          <p style={{ fontSize: 30, fontWeight: 500 }}>✏{BLOG_TITLE}</p>
        </div>
      </div>
    ),
    { ...size }
  );
}

// export default Image;

// export default function Image() {}

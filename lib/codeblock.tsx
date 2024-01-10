import parse, { HTMLReactParserOptions } from "html-react-parser";
import CodeblockCopy from "../src/app/components/CodeblockCopy";
import { ArticleProps } from "./type";

const parseContent = ({ article }: ArticleProps) => {
  let fileName: string;
  let tempName: string;

  const options: HTMLReactParserOptions = {
    replace: ({ attribs, children, name, parent }: any) => {
      if (!attribs || Object.keys(attribs).length === 0) return;

      // attribsはhtmlタグ内の後ろにある属性をオブジェクト形式で保持している
      // console.log("これはなに？：%o", attribs);

      // nameはタグの名前を取得している
      // console.log("ねーむ：%s", name);

      // childrenは各htmlタグの値をオブジェクトとして取得している
      // htmlタグに挟まれた文章はchildren[0].dataに格納されている
      // console.log("ちるどれん：%o", children[0]?.data);

      // if (attribs.class === "iframely-responsive") {
      //   console.log("ぺあれんと：%o", parent);
      //   console.log("ちるどれん：%o", children[0]);
      // }

      if (name === "div" && attribs["data-filename"]) {
        tempName = attribs["data-filename"];
      }

      // 以下はattribsにclass属性が存在しているかどうかを判定
      if (attribs.class) {
        // console.log("あとりぶすくらす：%s", attribs.class);
        const match = attribs.class.match(/language-(\w+)/);
        // console.log("まっち：%s", match);
        if (match) {
          const language = match[1];
          const code = children[0].data;
          fileName = tempName;
          tempName = "";

          // console.log("ふぁいるねーむ3：%s", filename);
          return (
            <CodeblockCopy
              language={language}
              code={code}
              filename={fileName}
            />
          );
        }
      }
    },
  };
  // console.log("あーてぃくる：%s", article);
  const parseCode = parse(article.content, options);
  // console.log("ふぁいるねーむ4：%s", filename);
  return parseCode;
};

export default parseContent;

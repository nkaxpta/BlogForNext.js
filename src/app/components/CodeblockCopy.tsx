"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
// import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { IconButton } from "@mui/material";
import { CodeProps } from "../../../lib/type";

// SyntaxHighlighter.registerLanguage("bash", bash);
// SyntaxHighlighter.registerLanguage("tsx", tsx);

const CodeblockCopy = ({ language, code, filename }: CodeProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      await setIsCopied(true);
      await setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };
  // console.log(code);
  // console.log("filename：%s", filename);

  return (
    <div>
      <div
        className={
          filename
            ? "flex justify-between bg-vscodedark rounded-md -mb-4 mt-2 z-10 relative"
            : "text-right -mb-9 mt-4 z-10 relative"
        }
      >
        {filename && (
          <div className="text-sm my-auto text-gray-300 pl-3">{filename}</div>
        )}
        <IconButton
          aria-label="copy"
          size="small"
          onClick={handleCopy}
          className="hover:bg-slate-600 duration-300"
        >
          {isCopied ? (
            <CheckRoundedIcon
              fontSize="inherit"
              className="rounded-sm text-gray-100"
            />
          ) : (
            <ContentCopyIcon
              fontSize="inherit"
              className="rounded-sm text-gray-100"
            />
          )}
        </IconButton>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={true}
        className="rounded-md relative z-0"
        lineNumberStyle={{
          gridColumn: "1",
          minWidth: "unset",
          width: "2em",
          paddingRight: "1em",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeblockCopy;

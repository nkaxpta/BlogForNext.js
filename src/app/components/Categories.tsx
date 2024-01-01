import React from "react";
import Link from "next/link";
import SellIcon from "@mui/icons-material/Sell";
import { ArticleProps } from "../../../lib/type";

const Categories = ({ article }: ArticleProps) => {
  return (
    <div className="flex mt-2">
      {article.categories.map((category) => {
        return (
          <div
            key={category}
            className="justify-between text-xs border-gray-500 rounded mx-2 hover:text-blue-500 duration-200"
          >
            <Link href={`/Articles/Category/${category.toLowerCase()}/page/1`}>
              <SellIcon fontSize="small" /> {category}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;

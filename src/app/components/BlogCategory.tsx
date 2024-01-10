import React from "react";
import { getAllCategories } from "~/lib/client";
import Link from "next/link";

const BlogCategory = async () => {
  const categoryObj = await getAllCategories();
  // console.log(categoryObj);

  return (
    <aside>
      <div className="bg-gray-100 p-4 mb-6 mt-3 sm:mx-6 md:mr-10 rounded-lg">
        <h3 className="text-gray-800 mb-2 border-b-4">Blog Category</h3>
        <div className="flex-wrap gap-4">
          {Object.keys(categoryObj).map((category: string) => (
            <div key={category} className="text-gray-600">
              <ul>
                <li className="my-2">
                  <div className="flex justify-between">
                    <Link
                      href={`/Articles/Category/${category.toLowerCase()}/page/1`}
                    >
                      <span className="hover:text-blue-500 duration-200">
                        {category}
                      </span>
                    </Link>
                    <span>({categoryObj[category]})</span>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogCategory;

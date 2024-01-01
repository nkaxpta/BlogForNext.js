"use client";

import { useRouter } from "next/navigation";
import { Pagination as MuiPagination, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { paginationProps } from "../../../lib/type";

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          display: "inline-block",
        },
      },
    },
  },
});

export const Pagination = ({
  pageNumber,
  totalCount,
  prefixUrl,
}: paginationProps) => {
  const router = useRouter();
  // console.log("るーたー：%o", router);

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // console.log("いべんと：%o", event);

    event.preventDefault();
    router.push(`${prefixUrl}/${value}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ThemeProvider theme={theme}>
        <MuiPagination
          page={pageNumber}
          count={totalCount}
          onChange={handleChange}
          className="py-5"
        />
      </ThemeProvider>
    </div>
  );
};

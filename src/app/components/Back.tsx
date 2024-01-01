"use client";

import { useRouter } from "next/navigation";

export const Back = () => {
  const router = useRouter();

  const handleBack = (event: React.ChangeEvent<unknown>) => {
    // console.log("いべんと：%o", event);

    router.back();
    router.refresh();
  };
  return <button onClick={handleBack}>← Back</button>;
};

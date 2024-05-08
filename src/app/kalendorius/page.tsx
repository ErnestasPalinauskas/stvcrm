import React from "react";

import Calendar from "@/components/calander";
import Menu from "@/components/menu";
import Avatar from "@/components/avatar";

async function Page() {
  return (
    <div>
      <Menu />
      <Calendar />
    </div>
  );
}

export default Page;

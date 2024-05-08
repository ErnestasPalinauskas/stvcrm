import React from "react";

export default function PrasymaiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <div className="flex justify-center">
        <div className="w-7/12"></div>
        <div className="flex-1 w-5/12"></div>
      </div>
    </div>
  );
}

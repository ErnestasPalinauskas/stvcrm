// Išdėstymo failas vartotojų puslapyje, perrašo aukščiausio lygio išdėstymo failą
// Sukūrė: Karolis Momkus

import React from "react";

export default function LaidosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

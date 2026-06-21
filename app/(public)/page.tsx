"use client"

import { Section, Slider } from "@/shared";

export default function HomePage() {

  return (
    <div className="mt-20">
      <Slider
        images={[
          "/assets/Image01.png",
          "/assets/Image02.png",
          "/assets/Image03.png",
        ]}
      />

      <Section 
        title="Destaques"
      />
    </div>
  );
}

"use client";

import { Scatterplot } from "@/components/ScatterPlot";
import { data } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <div className="mt-10 text-3xl text-white">Title</div>
      <div className="mt-4 text-xl text-white">Subtitle</div>
      <Scatterplot data={data} width={600} height={600} />
    </main>
  );
}

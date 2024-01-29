"use client";

import { Scatterplot } from "@/components/ScatterPlot";
import { data } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <div className="mt-10 text-3xl text-white">
        Visualize Student Group Formation based on Individual Skills and
        Interests
      </div>
      <div className="mt-4 text-xl text-white">
        DH2321 Project1 - Nathalie Lock - 2024/01/29{" "}
      </div>
      <Scatterplot data={data} width={800} height={800} />
    </main>
  );
}

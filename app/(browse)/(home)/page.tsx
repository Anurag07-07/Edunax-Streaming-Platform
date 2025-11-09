import { Suspense } from "react";
import {Results, ResultsSkeleton} from "./_components/Results";

export default function Page() {
  return <div className=" h-full max-w-screen-2xl mx-auto">
    <Suspense fallback={<ResultsSkeleton></ResultsSkeleton>}>
      <Results></Results>
    </Suspense>
  </div>
}
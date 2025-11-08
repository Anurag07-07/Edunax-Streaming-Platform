import { Suspense } from "react";
import {Results, ResultSkeleton} from "./_components/Results";

export default function Page() {
  return <div className=" h-full max-w-screen-2xl mx-auto">
    <Suspense fallback={<ResultSkeleton></ResultSkeleton>}>
      <Results></Results>
    </Suspense>
  </div>
}
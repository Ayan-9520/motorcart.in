import { Link } from "react-router-dom";
import type { PsOrderPipeline } from "../types";

export function PsOrderPipelineBoard({ pipeline }: { pipeline: PsOrderPipeline[] }) {
  return (
    <div className="psp-pipeline">
      {pipeline.map((p) => (
        <Link
          key={p.stage}
          to={`/dashboard/parts/orders?stage=${p.stage}`}
          className="psp-pipeline__col"
        >
          <p className="psp-pipeline__label">{p.label}</p>
          <p className="psp-pipeline__count">{p.count}</p>
        </Link>
      ))}
    </div>
  );
}

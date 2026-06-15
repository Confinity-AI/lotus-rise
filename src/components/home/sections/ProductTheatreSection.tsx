import { ProductTheatre } from "@/components/ProductTheatre";
import { SectionShell } from "../SectionShell";

export const ProductTheatreSection = () => (
  <SectionShell tone="white" wide id="product-theatre">
    <div className="lr-section-head lr-section-head--center">
      <p className="lr-eyebrow">Meet Janus</p>
      <h2 className="lr-h2">The platform behind Lotus Rise.</h2>
      <p className="lr-body lr-lead">
        Janus brings evaluation, grant management, and strategy into one connected workspace. Each panel below
        mirrors the real Janus product your team works in every day.
      </p>
    </div>
    <ProductTheatre />
  </SectionShell>
);

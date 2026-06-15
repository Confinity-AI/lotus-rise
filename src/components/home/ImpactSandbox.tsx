"use client";

import { useState } from "react";
import { ImpactStat } from "../ImpactStat";

export const ImpactSandbox = () => {
  const [grantees, setGrantees] = useState(8);

  const reclaimedHours = Math.round(grantees * 48);
  const licenses = Math.max(1, Math.ceil(grantees / 10));
  const subsidizedSeats = licenses * 10;
  const spareSeats = subsidizedSeats - grantees;

  return (
    <div>
      <div className="he-sandbox-grid">
        <div>
          <label className="he-sandbox-field">
            <span className="he-sandbox-label-row">
              Portfolio grantees
              <strong>{grantees} organizations</strong>
            </span>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={grantees}
              onChange={(e) => setGrantees(Number.parseInt(e.target.value, 10))}
              className="impact-range"
              aria-label="Number of grantee organizations"
            />
          </label>
        </div>
        <div className="he-sandbox-stats">
          <div>
            <span className="he-sandbox-label">Hours reclaimed</span>
            <ImpactStat value={reclaimedHours} suffix=" hrs" />
          </div>
          <div>
            <span className="he-sandbox-label">Subsidized workspaces</span>
            <ImpactStat value={subsidizedSeats} suffix=" free" />
          </div>
        </div>
      </div>
      <div className="he-sandbox-foot">
        <div className="he-sandbox-foot__row">
          <span>Licenses needed · ten free workspaces each</span>
          <span className="he-sandbox-foot__value">
            {subsidizedSeats} included ({licenses} {licenses === 1 ? "license" : "licenses"})
          </span>
        </div>
        <div className="impact-progress-track">
          <div
            className="impact-progress-fill"
            style={{ width: `${Math.min(100, (grantees / subsidizedSeats) * 100)}%` }}
          />
        </div>
        {spareSeats > 0 ? (
          <p className="he-sandbox-spare">
            {spareSeats} subsidized {spareSeats === 1 ? "workspace remains" : "workspaces remain"} for portfolio
            growth under this license count.
          </p>
        ) : null}
        <p className="he-sandbox-note">
          Hours reclaimed assumes roughly 48 admin hours per grantee per year on duplicate reporting (sector average).
        </p>
      </div>
    </div>
  );
};

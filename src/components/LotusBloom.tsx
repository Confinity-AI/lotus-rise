import type { CSSProperties } from "react";

type PetalStyle = CSSProperties & {
  "--drift-angle": string;
  "--drift-delay": string;
  "--drift-duration": string;
  "--open-delay": string;
  "--open-duration": string;
  "--petal-angle": string;
  "--petal-scale-x": string;
  "--petal-scale-y": string;
};

const petalRings = [
  {
    name: "outer",
    count: 13,
    offset: 0,
    path: "M260 276 C211 260 192 212 211 158 C221 130 240 101 250 88 C255 81 265 81 270 88 C280 101 299 130 309 158 C328 212 309 260 260 276 Z",
    shadow: "M260 275 C222 259 204 220 218 169 C224 147 235 123 249 99 C232 154 236 225 260 275 Z",
    ridge: "M260 270 C252 231 253 169 260 101 C267 169 268 231 260 270 Z",
    scaleX: 1,
    scaleY: 1,
    delay: 0,
    step: 90,
    openDuration: 6000,
    driftStart: 7.2,
    driftDuration: 15.5,
  },
  {
    name: "middle",
    count: 10,
    offset: 16,
    path: "M260 273 C219 258 207 220 222 179 C230 157 245 133 253 124 C257 119 263 119 267 124 C275 133 290 157 298 179 C313 220 301 258 260 273 Z",
    shadow: "M260 272 C231 258 216 225 228 186 C235 163 244 146 253 132 C242 177 245 236 260 272 Z",
    ridge: "M260 268 C254 229 255 177 260 132 C265 177 266 229 260 268 Z",
    scaleX: 1,
    scaleY: 1,
    delay: 850,
    step: 115,
    openDuration: 5600,
    driftStart: 7.7,
    driftDuration: 13.7,
  },
  {
    name: "inner",
    count: 7,
    offset: 2,
    path: "M260 270 C228 258 221 229 233 198 C240 181 249 167 252 163 C256 158 264 158 268 163 C271 167 280 181 287 198 C299 229 292 258 260 270 Z",
    shadow: "M260 269 C237 257 229 232 239 203 C244 186 251 174 254 168 C249 201 251 244 260 269 Z",
    ridge: "M260 266 C256 235 257 198 260 169 C263 198 264 235 260 266 Z",
    scaleX: 1,
    scaleY: 1,
    delay: 1550,
    step: 145,
    openDuration: 5000,
    driftStart: 8,
    driftDuration: 12,
  },
] as const;

const angleJitter = [-1.4, 0.7, -0.35, 1.05, -0.8, 0.25, 1.25, -0.55, 0.45, -1.1, 0.75, -0.2, 0.9];
const widthJitter = [-0.04, 0.018, -0.012, 0.035, -0.025, 0.008, 0.028, -0.018];
const lengthJitter = [-0.022, 0.012, 0.026, -0.012, 0.018, -0.026, 0.008];

const stamens = Array.from({ length: 16 }, (_, index) => {
  const angle = (index / 16) * Math.PI * 2;
  const radius = index % 2 === 0 ? 24 : 28;
  return {
    cx: 260 + Math.cos(angle) * radius,
    cy: 260 + Math.sin(angle) * radius,
    r: index % 3 === 0 ? 2.4 : 1.9,
  };
});

const seeds = [
  [260, 252],
  [253, 259],
  [267, 259],
  [257, 267],
  [264, 267],
] as const;

export function LotusBloom() {
  return (
    <figure className="lotus-bloom reveal" aria-hidden="true">
      <svg viewBox="0 0 520 520" role="presentation" focusable="false">
        <defs>
          <linearGradient
            id="lotus-outer-petal"
            x1="260"
            y1="276"
            x2="260"
            y2="81"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#74a58c" />
            <stop offset="0.38" stopColor="#c7dece" />
            <stop offset="0.78" stopColor="#edf4eb" />
            <stop offset="1" stopColor="#f7faf5" />
          </linearGradient>
          <linearGradient
            id="lotus-middle-petal"
            x1="260"
            y1="273"
            x2="260"
            y2="119"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#4f8b70" />
            <stop offset="0.48" stopColor="#9bc3aa" />
            <stop offset="1" stopColor="#dfebdf" />
          </linearGradient>
          <linearGradient
            id="lotus-inner-petal"
            x1="260"
            y1="270"
            x2="260"
            y2="156"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#2e7057" />
            <stop offset="0.52" stopColor="#74a78e" />
            <stop offset="1" stopColor="#c4dcca" />
          </linearGradient>
          <filter id="lotus-petal-shadow" x="-35%" y="-35%" width="170%" height="180%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4.5"
              floodColor="#0b3f32"
              floodOpacity="0.12"
            />
          </filter>
          <filter id="lotus-heart-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#5d4a0b" floodOpacity="0.16" />
          </filter>
        </defs>

        <ellipse className="lotus-bloom-shadow" cx="260" cy="280" rx="182" ry="168" />

        {petalRings.map((ring) => (
          <g className={`lotus-petal-ring lotus-petal-ring-${ring.name}`} key={ring.name}>
            {Array.from({ length: ring.count }, (_, index) => {
              const driftDirection = index % 2 === 0 ? 1 : -1;
              const style: PetalStyle = {
                "--drift-angle": `${driftDirection * (0.28 + (index % 3) * 0.12)}deg`,
                "--drift-delay": `${(ring.driftStart + (index % 4) * 0.34).toFixed(2)}s`,
                "--drift-duration": `${(ring.driftDuration + (index % 3) * 0.8).toFixed(2)}s`,
                "--open-delay": `${ring.delay + index * ring.step}ms`,
                "--open-duration": `${ring.openDuration}ms`,
                "--petal-angle": `${(ring.offset + (index * 360) / ring.count + angleJitter[index % angleJitter.length]).toFixed(2)}deg`,
                "--petal-scale-x": (ring.scaleX + widthJitter[index % widthJitter.length]).toFixed(
                  3,
                ),
                "--petal-scale-y": (
                  ring.scaleY + lengthJitter[index % lengthJitter.length]
                ).toFixed(3),
              };

              return (
                <g className="lotus-petal-shell" style={style} key={`${ring.name}-${index}`}>
                  <g className="lotus-petal-face">
                    <path className="lotus-petal-surface" d={ring.path} />
                    <path className="lotus-petal-shadow-side" d={ring.shadow} />
                    <path className="lotus-petal-ridge" d={ring.ridge} />
                  </g>
                </g>
              );
            })}
          </g>
        ))}

        <g className="lotus-heart" filter="url(#lotus-heart-shadow)">
          <circle className="lotus-heart-halo" cx="260" cy="260" r="31" />
          {stamens.map((stamen) => (
            <circle
              className="lotus-stamen"
              cx={stamen.cx}
              cy={stamen.cy}
              r={stamen.r}
              key={`${stamen.cx}-${stamen.cy}`}
            />
          ))}
          <circle className="lotus-seed-pod" cx="260" cy="260" r="14" />
          {seeds.map(([cx, cy]) => (
            <circle className="lotus-seed" cx={cx} cy={cy} r="1.65" key={`${cx}-${cy}`} />
          ))}
        </g>
      </svg>
    </figure>
  );
}

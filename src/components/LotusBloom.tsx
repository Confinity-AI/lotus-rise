export function LotusBloom() {
  const petal = "M260 394 C211 314 214 207 260 88 C306 207 309 314 260 394 Z";

  return (
    <figure className="lotus-bloom reveal" aria-hidden="true">
      <svg viewBox="0 0 520 520" role="presentation">
        <circle className="lotus-bloom-ring lotus-bloom-ring-outer" cx="260" cy="266" r="190" />
        <circle className="lotus-bloom-ring lotus-bloom-ring-inner" cx="260" cy="266" r="132" />
        <path className="lotus-bloom-axis" d="M260 44 V470" />
        <path className="lotus-bloom-axis" d="M78 394 H442" />

        <path className="lotus-petal lotus-petal-1" d={petal} />
        <path className="lotus-petal lotus-petal-9" d={petal} />
        <path className="lotus-petal lotus-petal-2" d={petal} />
        <path className="lotus-petal lotus-petal-8" d={petal} />
        <path className="lotus-petal lotus-petal-3" d={petal} />
        <path className="lotus-petal lotus-petal-7" d={petal} />
        <path className="lotus-petal lotus-petal-4" d={petal} />
        <path className="lotus-petal lotus-petal-6" d={petal} />
        <path className="lotus-petal lotus-petal-5" d={petal} />

        <path
          className="lotus-bloom-base"
          d="M148 394 C195 365 227 365 260 394 C293 365 325 365 372 394 C327 430 193 430 148 394 Z"
        />
        <path className="lotus-bloom-stem" d="M260 394 V470" />
        <path className="lotus-bloom-trace lotus-bloom-trace-left" d="M112 394 H180" />
        <path className="lotus-bloom-trace lotus-bloom-trace-right" d="M340 394 H408" />
        <circle className="lotus-bloom-node lotus-bloom-node-left" cx="104" cy="394" r="5" />
        <circle className="lotus-bloom-node lotus-bloom-node-center" cx="260" cy="476" r="5" />
        <circle className="lotus-bloom-node lotus-bloom-node-right" cx="416" cy="394" r="5" />
      </svg>
    </figure>
  );
}

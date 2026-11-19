"use client";

import { lagreSjekkliste, useFremdrift } from "./fremdrift";

/** Avkrysningsliste som huskes i nettleseren. */
export function Sjekkliste({ id, punkter }: { id: string; punkter: string[] }) {
  const f = useFremdrift();
  const verdier = f.sjekklister[id] ?? punkter.map(() => false);

  return (
    <div className="sjekkliste">
      <p className="quiz__etikett">✅ Sjekkliste før du går videre</p>
      <ul>
        {punkter.map((p, i) => (
          <li key={i}>
            <label>
              <input
                type="checkbox"
                checked={verdier[i] ?? false}
                onChange={(e) => {
                  const neste = punkter.map((_, j) => verdier[j] ?? false);
                  neste[i] = e.target.checked;
                  lagreSjekkliste(id, neste);
                }}
              />
              <span>{p}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

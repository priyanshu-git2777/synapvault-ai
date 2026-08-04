import { Check, Minus } from "lucide-react";

interface ComparisonRow {
  feature: string;
  free: boolean | string;
  pro: boolean | string;
  team: boolean | string;
}

const rows: ComparisonRow[] = [
  {
    feature: "Personal workspace",
    free: true,
    pro: true,
    team: true,
  },
  {
    feature: "Document chat with citations",
    free: true,
    pro: true,
    team: true,
  },
  {
    feature: "Monthly document processing",
    free: "Limited",
    pro: "Higher limit",
    team: "Shared allocation",
  },
  {
    feature: "Document comparison",
    free: false,
    pro: true,
    team: true,
  },
  {
    feature: "Knowledge graphs",
    free: false,
    pro: true,
    team: true,
  },
  {
    feature: "Member roles",
    free: false,
    pro: false,
    team: true,
  },
  {
    feature: "Shared workspaces",
    free: false,
    pro: false,
    team: true,
  },
  {
    feature: "Audit history",
    free: false,
    pro: false,
    team: true,
  },
];

export function PricingComparison() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/75 bg-white/65 shadow-sm backdrop-blur-xl">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">
          Comparison of planned SynapVault subscription features
        </caption>

        <thead>
          <tr className="border-b border-slate-200/70">
            <th
              scope="col"
              className="px-6 py-5 text-sm font-black text-slate-950"
            >
              Feature
            </th>

            <th
              scope="col"
              className="px-6 py-5 text-center text-sm font-black text-slate-950"
            >
              Free
            </th>

            <th
              scope="col"
              className="bg-violet-50/60 px-6 py-5 text-center text-sm font-black text-violet-800"
            >
              Pro
            </th>

            <th
              scope="col"
              className="px-6 py-5 text-center text-sm font-black text-slate-950"
            >
              Team
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.feature}
              className="border-b border-slate-200/60 last:border-b-0"
            >
              <th
                scope="row"
                className="px-6 py-5 text-sm font-semibold text-slate-700"
              >
                {row.feature}
              </th>

              <ComparisonValue value={row.free} />
              <ComparisonValue value={row.pro} highlighted />
              <ComparisonValue value={row.team} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonValue({
  value,
  highlighted = false,
}: {
  value: boolean | string;
  highlighted?: boolean;
}) {
  return (
    <td
      className={
        highlighted
          ? "bg-violet-50/60 px-6 py-5 text-center"
          : "px-6 py-5 text-center"
      }
    >
      {value === true && (
        <>
          <Check
            className="mx-auto size-5 text-emerald-600"
            aria-hidden="true"
          />
          <span className="sr-only">Included</span>
        </>
      )}

      {value === false && (
        <>
          <Minus className="mx-auto size-5 text-slate-300" aria-hidden="true" />
          <span className="sr-only">Not included</span>
        </>
      )}

      {typeof value === "string" && (
        <span className="text-xs font-bold text-slate-600">{value}</span>
      )}
    </td>
  );
}

const LEVEL_STYLES = {
  High: "bg-error/10 text-error",
  Elevated: "bg-status-amber/10 text-[#a16207]",
};

export default function FastestChangingTable({ areas }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded flex flex-col">
      <div className="p-stack-md border-b border-outline-variant">
        <h3 className="font-headline-md text-headline-md text-on-background">
          Fastest Changing Areas
        </h3>
        <p className="font-body-sm text-body-sm text-secondary">
          Highest growth rate in reported cases over 30 days.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low text-secondary font-label-md border-b border-outline-variant">
            <tr>
              <th className="px-4 py-3 font-medium">Area</th>
              <th className="px-4 py-3 font-medium text-right">Cases</th>
              <th className="px-4 py-3 font-medium text-right">
                Recent Growth
              </th>
              <th className="px-4 py-3 font-medium">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant text-on-surface-variant">
            {areas.map((row) => (
              <tr
                key={row.area}
                className="hover:bg-surface-variant transition-colors"
              >
                <td className="px-4 py-3 font-medium text-on-background">
                  {row.area}
                </td>
                <td className="px-4 py-3 text-right">{row.cases}</td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    row.level === "High" ? "text-error" : "text-[#a16207]"
                  }`}
                >
                  {row.growth}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      LEVEL_STYLES[row.level]
                    }`}
                  >
                    {row.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

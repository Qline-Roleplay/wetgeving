import { WETBOEK_ENTRIES, formatStraf, type WetKey } from '@/lib/wetboek-data';

export function WetTable({ wet }: { wet: WetKey }) {
  const rows = WETBOEK_ENTRIES.filter((entry) => entry.wet === wet);

  return (
    <table>
      <thead>
        <tr>
          <th>Feit</th>
          <th>Artikel</th>
          <th>Strafmaat</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.feit}</td>
            <td>{entry.artikel}</td>
            <td>{formatStraf(entry.straf)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

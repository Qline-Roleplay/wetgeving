import { BOETES_ENTRIES, formatBoete } from '@/lib/boetes-data';

export function BoeteTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Overtreding</th>
          <th>Boetebedrag</th>
        </tr>
      </thead>
      <tbody>
        {BOETES_ENTRIES.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.overtreding}</td>
            <td>{formatBoete(entry.bedrag)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

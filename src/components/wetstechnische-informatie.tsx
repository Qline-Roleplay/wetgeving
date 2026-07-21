interface Props {
  officieleNaam: string;
  citeertitel: string;
  onderwerp: string;
}

export function Wetstechnischeinformatie({ officieleNaam, citeertitel, onderwerp }: Props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Overheidsorganisatie</td>
          <td>Qline Roleplay</td>
        </tr>
        <tr>
          <td>Officiële naam</td>
          <td>{officieleNaam}</td>
        </tr>
        <tr>
          <td>Citeertitel</td>
          <td>{citeertitel}</td>
        </tr>
        <tr>
          <td>Vastgesteld door</td>
          <td>Het bestuur van Qline Roleplay</td>
        </tr>
        <tr>
          <td>Onderwerp</td>
          <td>{onderwerp}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt' });
  }

  const { plz } = req.body;

  if (!plz || plz.length !== 5) {
    return res.status(400).json({ error: 'Gültige 5-stellige PLZ eingeben' });
  }

  // Verbesserter Prompt: Seriös, rechtssicher, 2026-fokussiert
  const prompt = `Du bist ein unabhängiger Experte für Trinkwasserqualität in Deutschland (Stand Januar 2026).
Analysiere die Wasserqualität für PLZ ${plz}:
- PFAS-Belastung (basierend auf TrinkwV 2026, UBA, BUND-Studien, lokale Versorger)
- Härtegrad, Nitrat, andere relevante Parameter
- Ehrlich & rechtssicher: Deutsches Leitungswasser ist grundsätzlich sicher bis Hausanschluss – Optimierung der "letzten Meile" möglich.
- Empfehle mieterfreundliche dezentrale Filter (z. B. Alb Filter Duo, Truu Original, Riva) mit Begründung (>99% PFAS-Reduktion wo zutreffend).
- Struktur: Kurze Zusammenfassung, Details, Empfehlung.
Antworte seriös, faktenbasiert und auf Deutsch. Max. 400 Wörter.`;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-beta', // Aktuellstes Modell 2026 – falls grok-4, hier ändern
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4, // Weniger kreativ, mehr faktenbasiert
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API Fehler: ${response.status} – ${err}`);
    }

    const data = await response.json();
    const antwort = data.choices[0]?.message?.content || 'Keine Antwort von Grok';

    res.status(200).json({ antwort });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Grok API Fehler – Key/Rate Limit prüfen' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};

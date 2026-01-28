import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>WasserReinheit 2026 – Grok AI Powered Premium Wasseroptimierung</title>
        <meta name="description" content="Intelligente PFAS-Analyse 2026 mit Grok AI – personalisiert für Norden & Deutschland." />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: { primary: '#0f172a', accent: '#fcd34d', glass: 'rgba(255,255,255,0.08)' },
                fontFamily: { display: ['Playfair Display', 'serif'], sans: ['Inter', 'sans-serif'] }
              }
            }
          }
        ` }} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@600;800&display=swap" rel="stylesheet" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `AOS.init({ duration: 1000, once: true });` }} />
      </Head>

      <body className="bg-primary text-white">
        {/* Navigation */}
        <header className="fixed top-0 w-full bg-primary/90 backdrop-blur-lg z-50 border-b border-accent/10">
          <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
            <a href="/" className="text-4xl font-display text-accent tracking-wider">WasserReinheit 2026</a>
            <ul className="flex space-x-12 text-sm uppercase tracking-widest">
              <li><a href="#radar" className="hover:text-accent transition">Grok-Radar</a></li>
              <li><a href="#vergleich" className="hover:text-accent transition">Vergleich</a></li>
              <li><a href="#empfehlungen" className="hover:text-accent transition">Empfehlungen</a></li>
              <li><a href="#guide" className="hover:text-accent transition">Mieter-Guide</a></li>
            </ul>
          </nav>
        </header>

        {/* Hero + Radar */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <img src="/images/hero.jpg" alt="Luxus-Küche" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/70"></div>
          
          <div className="relative text-center px-8 max-w-7xl w-full" data-aos="fade-up">
            <h1 className="text-6xl md:text-8xl font-display mb-8 leading-tight drop-shadow-2xl">Reines Wasser.<br>Grok-Intelligent.</h1>
            <p className="text-2xl md:text-3xl opacity-95 mb-16 drop-shadow-lg">Live-Analyse mit xAI Grok – personalisiert für Ihren Standort.</p>
            
            <div id="radar" className="max-w-5xl mx-auto bg-glass backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/20" data-aos="fade-up" data-aos-delay="400">
              <h2 className="text-5xl font-display mb-12 text-center">Ihr Grok PFAS-Radar 2026</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
                <input id="plz-input" type="text" placeholder="PLZ eingeben (Default: 26506 Norden)" className="w-full md:w-1/2 px-12 py-8 rounded-3xl bg-white/10 text-white placeholder-white/60 text-2xl focus:outline-none focus:ring-4 focus:ring-accent/50" />
                <button id="analyze-button" onClick={() => analyzePLZ()} className="w-full md:w-auto bg-accent text-primary px-16 py-8 rounded-3xl font-bold text-2xl hover:bg-accent/90 shadow-lg">
                  Analyse starten →
                </button>
              </div>
              
              <div className="flex justify-center mb-8">
                <div id="loading-spinner" className="hidden animate-spin rounded-full h-16 w-16 border-t-8 border-accent"></div>
              </div>
              
              <div id="radar-result" className="bg-white/10 rounded-3xl p-12 text-left min-h-80">
                <p className="text-center opacity-70 text-xl">Klicken Sie – Grok analysiert live (Test: 26506 Norden)</p>
              </div>
            </div>
          </div>
        </section>

        {/* JS für Radar (client-side) */}
        <script dangerouslySetInnerHTML={{ __html: `
          async function analyzePLZ() {
            const plzInput = document.getElementById('plz-input');
            const plz = plzInput.value.trim() || '26506';
            const resultDiv = document.getElementById('radar-result');
            const button = document.getElementById('analyze-button');
            const spinner = document.getElementById('loading-spinner');

            resultDiv.innerHTML = '';
            spinner.classList.remove('hidden');
            button.disabled = true;

            try {
              const res = await fetch('/api/grok', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plz })
              });

              const data = await res.json();

              if (data.antwort) {
                resultDiv.innerHTML = '<div class="text-lg leading-relaxed"><p>' + data.antwort.replace(/\\n/g, '<br>') + '</p></div>';
              } else {
                resultDiv.innerHTML = '<p class="text-red-400 text-center">Fehler: ' + (data.error || 'Unbekannt') + '</p>';
              }
            } catch (err) {
              resultDiv.innerHTML = '<p class="text-red-400 text-center">Verbindungsfehler</p>';
            }

            spinner.classList.add('hidden');
            button.disabled = false;
          }
        ` }} />

        {/* Footer */}
        <footer className="py-20 bg-primary border-t border-accent/10">
          <div className="container mx-auto px-8 text-center">
            <p className="text-3xl font-display text-accent mb-8">WasserReinheit 2026</p>
            <p className="opacity-80">Powered by Grok AI – Für Norden & Deutschland</p>
          </div>
        </footer>
      </body>
    </>
  );
}

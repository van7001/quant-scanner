export default {
  async fetch() {
    const url =
      "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?count=50&scrIds=day_gainers&region=IN";

    const r = await fetch(url);
    const j = await r.json();

    const stocks = [];

    for (const q of j.finance.result[0].quotes) {
      const sym = q.symbol;
      const c = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=3mo`
      );
      const d = await c.json();
      const p = d.chart.result[0].indicators.quote[0].close.filter(Boolean);

      stocks.push({symbol:sym.replace(".NS",""),prices:p});
    }

    return new Response(JSON.stringify(stocks), {
      headers: { "Content-Type": "application/json" }
    });
  }
};

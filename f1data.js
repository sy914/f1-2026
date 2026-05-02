exports.handler = async function(event) {
  const tipo = event.queryStringParameters && event.queryStringParameters.tipo;

  const endpoints = {
    next:         'https://api.jolpi.ca/ergast/f1/2026/next.json?limit=5',
    drivers:      'https://api.jolpi.ca/ergast/f1/2026/driverStandings.json?limit=30',
    constructors: 'https://api.jolpi.ca/ergast/f1/2026/constructorStandings.json?limit=20',
    results:      'https://api.jolpi.ca/ergast/f1/2026/results/1.json?limit=100',
    schedule:     'https://api.jolpi.ca/ergast/f1/2026.json?limit=30',
    grid:         'https://api.jolpi.ca/ergast/f1/2026/last/qualifying.json?limit=30'
  };

  const url = endpoints[tipo];
  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'tipo inválido' }) };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Jolpica respondió ' + res.status);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300' // cache 5 min
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

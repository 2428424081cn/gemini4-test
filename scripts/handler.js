export default {
  async fetch(request) {
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    const url = new URL(request.url);
    let pathname;
    try { pathname = decodeURIComponent(url.pathname); }
    catch { return new Response('Bad Request', { status: 400 }); }
    if (pathname.includes('\0') || pathname.split('/').some(part => part === '..' || part === '.')) {
      return new Response('Bad Request', { status: 400 });
    }
    if (!pathname.endsWith('/') && Object.hasOwn(assets, `${pathname}/index.html`)) {
      url.pathname += '/';
      return new Response(null, { status: 308, headers: { Location: url.toString() } });
    }
    const key = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
    if (!Object.hasOwn(assets, key)) {
      return new Response(request.method === 'HEAD' ? null : '404 Not Found', { status: 404 });
    }
    const types = { html: 'text/html', css: 'text/css', js: 'application/javascript' };
    return new Response(request.method === 'HEAD' ? null : assets[key], {
      headers: {
        'Content-Type': `${types[key.split('.').pop()] || 'text/plain'}; charset=utf-8`,
        'Cache-Control': 'public, max-age=300',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
};

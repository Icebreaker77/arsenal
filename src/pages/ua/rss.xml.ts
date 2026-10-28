import rss from '@astrojs/rss';
import { SITE_URL } from '../../consts';
export async function GET() { return rss({ title: 'Arsenal 7 — гайди', description: 'Гайди зі спорядження та інструменту', site: `${SITE_URL}/ua/`, items: [] }); }

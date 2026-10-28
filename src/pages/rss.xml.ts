import rss from '@astrojs/rss';
import { SITE_URL } from '../consts';
export async function GET() { return rss({ title: 'Arsenal 7 — гайды', description: 'Гайды по снаряжению и инструменту', site: SITE_URL, items: [] }); }

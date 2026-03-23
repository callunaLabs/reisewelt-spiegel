// WordPress Headless CMS API Client
// Connects to WordPress REST API for content management

const WP_URL = import.meta.env.WP_URL || 'https://reisewelt-poc.calluna.ai';
const WP_API = `${WP_URL}/wp-json/wp/v2`;
const WP_CUSTOM = `${WP_URL}/wp-json/reisewelt/v1`;

interface WPImage {
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: Record<string, { source_url: string }>;
  };
}

// ─── Generic fetch helper ───
async function wpFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(endpoint);
  Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Media ───
async function getFeaturedImage(mediaId: number): Promise<WPImage | null> {
  if (!mediaId) return null;
  try {
    return await wpFetch<WPImage>(`${WP_API}/media/${mediaId}`);
  } catch {
    return null;
  }
}

// ─── Pages ───
export async function getPages() {
  return wpFetch<any[]>(WP_API + '/pages', { per_page: '100', _embed: '1' });
}

export async function getPageBySlug(slug: string) {
  const pages = await wpFetch<any[]>(WP_API + '/pages', { slug, _embed: '1' });
  return pages[0] || null;
}

// ─── Rundreisen (Custom Post Type) ───
export async function getRundreisen() {
  return wpFetch<any[]>(WP_API + '/rundreise', { per_page: '100', _embed: '1' });
}

export async function getRundreiseBySlug(slug: string) {
  const items = await wpFetch<any[]>(WP_API + '/rundreise', { slug, _embed: '1' });
  return items[0] || null;
}

// ─── Genussreisen (Custom Post Type) ───
export async function getGenussreisen() {
  return wpFetch<any[]>(WP_API + '/genussreise', { per_page: '100', _embed: '1' });
}

export async function getGenussreiseBySlug(slug: string) {
  const items = await wpFetch<any[]>(WP_API + '/genussreise', { slug, _embed: '1' });
  return items[0] || null;
}

// ─── Reisetrends (Custom Post Type) ───
export async function getReisetrends() {
  return wpFetch<any[]>(WP_API + '/reisetrend', { per_page: '100', _embed: '1' });
}

export async function getReisetrendBySlug(slug: string) {
  const items = await wpFetch<any[]>(WP_API + '/reisetrend', { slug, _embed: '1' });
  return items[0] || null;
}

// ─── Deals (Custom Post Type) ───
export async function getDeals() {
  return wpFetch<any[]>(WP_API + '/deal', { per_page: '100', _embed: '1' });
}

export async function getDealBySlug(slug: string) {
  const items = await wpFetch<any[]>(WP_API + '/deal', { slug, _embed: '1' });
  return items[0] || null;
}

// ─── Partners ───
export async function getPartners() {
  return wpFetch<any[]>(WP_API + '/partner', { per_page: '100', _embed: '1' });
}

// ─── Site Settings (via custom endpoint) ───
export async function getSiteSettings() {
  try {
    return await wpFetch<any>(WP_CUSTOM + '/settings');
  } catch {
    return {
      logo: '/uploads/spiegel-reisewelt-logo.png',
      siteTitle: 'SPIEGEL Reisewelt',
    };
  }
}

// ─── Helper: Extract featured image from _embed ───
export function getEmbeddedImage(post: any): string | null {
  try {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  } catch {
    return null;
  }
}

// ─── Helper: Extract ACF/meta fields ───
export function getMeta(post: any, field: string): any {
  return post.acf?.[field] || post.meta?.[field] || null;
}

// ─── Homepage data aggregator ───
export async function getHomepageData() {
  try {
    const [rundreisen, genussreisen, reisetrends, deals] = await Promise.all([
      getRundreisen().catch(() => []),
      getGenussreisen().catch(() => []),
      getReisetrends().catch(() => []),
      getDeals().catch(() => []),
    ]);
    return { rundreisen, genussreisen, reisetrends, deals };
  } catch {
    return { rundreisen: [], genussreisen: [], reisetrends: [], deals: [] };
  }
}

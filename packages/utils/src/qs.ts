import { inBrowser } from './basic';

/**
 * 解析search字符串
 * @param str
 * @param result
 * @returns
 * @example
 * parse('?a=1&b=2', {}) // { a: '1', b: '2' }
 */
function parse(str: string, result: Record<string, string> = {}) {
	str.split('&').forEach((pair) => {
		if (!pair) return;
		const [key, value] = pair.split('=');
		if (key) {
			const _key = key.replace(/^\?/, '');
			result[_key] = value;
		}
	});
	return result;
}

/**
 * index.html?a=1&b=2#/sub?c=3&d=4?e=5
 * hash #/sub?c=3&d=4?e=5
 * search ?a=1&b=2
 * return { a: '1', b: '2', c: '3', d: '4', e: '5' }
 */
function qs(url?: string) {
	const _url = url || (inBrowser ? location.href : '');
	const result: Record<string, string> = {};

	try {
		const [search, hash = ''] = _url.split('#');

		const searchMatch = search.match(/\?([^?#]*)/);
		if (searchMatch) {
			parse(searchMatch[1], result);
		}

		const hashMatch = hash.match(/\?([^?#]*)/g);
		if (hashMatch) {
			hashMatch.forEach((query) => {
				parse(query.slice(1), result);
			});
		}

		return result;
	} catch (e) {
		return result;
	}
}

/**
 * 将对象转换为search字符串
 * @param searchObj
 * @returns
 * @example
 * toSearch({ a: '1', b: '2' }) // '?a=1&b=2'
 */
function toSearch(searchObj: Record<string, string>): string {
	const str = Object.entries(searchObj)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
	return str ? `?${str}` : '';
}

export { parse, qs, toSearch };

/** Shorthand for Query Selector Function.
 * @param selector {string} CSS Selector. Must include class ('.') marker if needed
 * @param  [all] {boolean} optional to call querySelectorAll.
 * @return {Element} HTML Element
 * */
export function querySelector(selector, all = false) {
	return all === false
		? document.querySelector(selector)
		: document.querySelectorAll(selector);
}
/**
 * Makes AJAX request to LMS API. Also converts `'accessPlans'` to HTML-friedly `'access-plans.'`
 * @param {string} endpoint the endpoint url to add. *Note: should not include leading '/'*
 * @param {string} method the AJAX Method (GET, POST, DELETE, UPDATE)
 * @param {boolean} returnAll if `true`, returns an Array, else only return the `data`
 * @returns {Array|Object} `data` object or an Array containing [AJAX `res`ponse, The `data`, The `method`]
 */
export async function makeRequest(
	endpoint,
	method = 'GET',
	theData = false,
	returnAll = false,
) {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			method: `${method}`,
			timeout: 5000,
		};
		if (theData) {
			config.body = JSON.stringify(theData);
		}
		console.log(config);
		const res = await fetch(API_URL + `${endpoint}`, config);
		const data = await res.json();
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return returnAll ? [res, data, method] : data;
	} catch (error) {}
}

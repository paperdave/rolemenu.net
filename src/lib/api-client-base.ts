type Fetch = typeof fetch;
type Class<X> = new (...args: unknown[]) => X;

const defaultFetch =
	typeof window !== 'undefined'
		? fetch.bind(window)
		: () => {
				throw new Error('No fetch available');
		  };

export interface RequestOptions {
	body?: unknown;
	headers?: HeadersInit;
}

export class RESTClient {
	readonly base: string;
	#fetcher: Fetch;

	constructor(base: string, fetch?: Fetch) {
		this.base = base;
		this.#fetcher = fetch ?? defaultFetch;
	}

	withOtherBase(url: string): this {
		return new (this.constructor as Class<this>)(url, this.#fetcher);
	}

	withOtherFetch(fetch: Fetch) {
		return new (this.constructor as Class<this>)(this.base, fetch);
	}

	async fetch<T>(url: string, method: string, options: RequestOptions = {}): Promise<T> {
		const response = await this.#fetcher(`${this.base}${url}`, {
			...options,
			body: options.body ? JSON.stringify(options.body) : null,
			method
		});
		const data = await response.json();
		if (response.status >= 400) {
			throw new Error(`${response.status} ${response.statusText}`, data);
		}
		return data;
	}

	async get<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.fetch(url, 'GET', options);
	}

	async post<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.fetch(url, 'POST', options);
	}

	async patch<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.fetch(url, 'PATCH', options);
	}

	async del<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.fetch(url, 'DELETE', options);
	}

	async put<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.fetch(url, 'PUT', options);
	}
}

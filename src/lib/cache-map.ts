// CacheMap exported from sequencer.
interface CacheMapOptions<K, V> {
	ttl: number;
	checkTime: number;
	onDelete?: (key: K, value: V) => void;
}

interface Entry<K, V> {
	key: K;
	value: V;
	expires: number;
}

export class CacheMap<K, V> {
	map: Map<K, Entry<K, V>>;
	options: CacheMapOptions<K, V>;
	timeout: NodeJS.Timeout | null;

	constructor(options: Partial<CacheMapOptions<K, V>> = {}) {
		this.map = new Map();
		this.options = Object.assign({ ttl: 5 * 60, checkTime: 10 * 60 }, options);
		this.timeout = null;
	}
	set(key: K, value: V, ttl = this.options.ttl) {
		const entry = this.map.get(key);
		if (entry) {
			entry.value = value;
			entry.expires = ttl ? Date.now() + ttl * 1000 : null;
		} else {
			this.map.set(key, {
				key,
				value,
				expires: ttl ? Date.now() + ttl * 1000 : null
			});
			if (this.timeout !== null) {
				this.timeout = setTimeout(this.update, this.options.checkTime * 1000);
			}
		}
	}
	get(key: K) {
		const entry = this.map.get(key);
		if (entry && (!entry.expires || entry.expires > Date.now())) {
			return entry.value;
		}
		return null;
	}
	has(key: K) {
		return this.map.has(key);
	}
	touch(key: K, ttl = this.options.ttl) {
		const entry = this.map.get(key);
		if (entry) {
			entry.expires = ttl ? Date.now() + ttl * 1000 : null;
		}
	}
	update() {
		this.map.forEach((entry) => {
			if (entry.expires && entry.expires < Date.now()) {
				this.delete(entry.key);
			}
		});
		if (this.map.size >= 1) {
			this.timeout = setTimeout(this.update, this.options.checkTime);
		}
	}
	delete(key: K) {
		const entry = this.map.get(key);
		if (entry) {
			this.options.onDelete && this.options.onDelete(key, entry.value);
		}
		this.map.delete(key);
		if (this.map.size === 0 && this.timeout) {
			clearTimeout(this.timeout);
		}
	}
	clear() {
		this.map.clear();
	}
	dispose() {
		if (this.timeout) clearTimeout(this.timeout);
		this.map.clear();
	}
}

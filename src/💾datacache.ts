export interface DataCache {
	set: (key: string, value: unknown) => void;
	get: (key: string) => unknown;
}

export class BrowserDataCache implements DataCache {
	contents = new Map<string, unknown>();

	constructor() {
		const el = document.body.querySelector("#datacache");
		if (!el) {
			throw new Error("No datacache element found");
		}
		const data = JSON.parse(el.textContent || "{}");
		for (const [key, value] of Object.entries(data)) {
			this.set(key, value);
		}
	}

	set(key: string, value: any) {
		this.contents.set(key, value);
	}

	get(key: string) {
		return this.contents.get(key);
	}
}

export class ServerDataCache implements DataCache {
	contents = new Map<string, unknown>();

	set(key: string, value: any) {
		this.contents.set(key, value);
	}

	get(key: string) {
		return this.contents.get(key);
	}

	searialize() {
		return JSON.stringify(Object.fromEntries(this.contents));
	}
}

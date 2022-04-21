export function deferred<T>(): [Promise<T>, (result: T) => void, (error: Error) => void] {
	let resolve: (result: T) => void;
	let reject: (error: Error) => void;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return [promise, resolve, reject];
}

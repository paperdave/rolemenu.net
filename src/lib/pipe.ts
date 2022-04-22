export function pipe<Input, Output>(input: Input, f1: (input: Input) => Output): Output;
export function pipe<Input, Middle, Output>(
	input: Input,
	f1: (input: Input) => Middle,
	f2: (input: Middle) => Output
): Output;
export function pipe<Input, Middle, Middle2, Output>(
	input: Input,
	f1: (input: Input) => Middle,
	f2: (input: Middle) => Middle2,
	f3: (input: Middle2) => Output
): Output;
export function pipe<Input, Middle, Middle2, Middle3, Output>(
	input: Input,
	f1: (input: Input) => Middle,
	f2: (input: Middle) => Middle2,
	f3: (input: Middle2) => Middle3,
	f4: (input: Middle3) => Output
): Output;
export function pipe<Input, Middle, Middle2, Middle3, Middle4, Output>(
	input: Input,
	f1: (input: Input) => Middle,
	f2: (input: Middle) => Middle2,
	f3: (input: Middle2) => Middle3,
	f4: (input: Middle3) => Middle4,
	f5: (input: Middle4) => Output
): Output;
export function pipe<Input, Middle, Middle2, Middle3, Middle4, Middle5, Output>(
	input: Input,
	f1: (input: Input) => Middle,
	f2: (input: Middle) => Middle2,
	f3: (input: Middle2) => Middle3,
	f4: (input: Middle3) => Middle4,
	f5: (input: Middle4) => Middle5,
	f6: (input: Middle5) => Output
): Output;
export function pipe<Input, Middle, Middle2, Middle3, Middle4, Middle5, Middle6, Output>(
	input: Input,
	f1: (input: Input) => Middle,
	f2: (input: Middle) => Middle2,
	f3: (input: Middle2) => Middle3,
	f4: (input: Middle3) => Middle4,
	f5: (input: Middle4) => Middle5,
	f6: (input: Middle5) => Middle6,
	f7: (input: Middle6) => Output
): Output;
export function pipe(input: unknown, ...fns: ((arg: unknown) => unknown)[]): unknown {
	return fns.reduce((input, f) => f(input), input);
}

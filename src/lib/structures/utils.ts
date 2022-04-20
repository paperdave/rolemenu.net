import { DataType } from '@davecode/structures';

class JSONDataTypeClass<X> extends DataType<X, X> {
	toJSON(value: X): X {
		return value;
	}

	fromJSON(value: X): X {
		return value;
	}
}

export function JSONDataType<X>() {
	return new JSONDataTypeClass<X>();
}

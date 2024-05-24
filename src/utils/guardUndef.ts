export function guardUndef<T>(value: T): NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error("value is undefined or null");
    }

    return value;
}

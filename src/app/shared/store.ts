export class Store extends Map {
    public override get<V>(
        key: string,
        value?: V,
    ): V {
        if (!this.has(key)) {
            this.set(key, value);
        }
        return super.get(key);
    }
}
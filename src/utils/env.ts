type NameToType = {
    readonly REACT_APP_BASE_URL: string;
    readonly REACT_APP_USER_ID: number;
};

export function getEnv<Env extends keyof NameToType>(name: Env): NameToType[Env] | undefined;
export function getEnv(name: keyof NameToType): NameToType[keyof NameToType] | undefined {
    const val = process.env[name];

    if (!val) {
        return undefined;
    }

    return val;
}

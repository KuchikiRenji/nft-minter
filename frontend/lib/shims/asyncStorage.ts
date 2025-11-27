type AsyncValue = string | null;

const asyncStorage = {
  getItem: async (_key: string): Promise<AsyncValue> => null,
  setItem: async (_key: string, _value: string): Promise<void> => undefined,
  removeItem: async (_key: string): Promise<void> => undefined,
};

export default asyncStorage;


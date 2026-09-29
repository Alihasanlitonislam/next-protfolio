// eslint-disable-next-line import/no-anonymous-default-export
export default class {
  private errors: Record<string, string[]>;

  constructor() {
    this.errors = {};
  }

  record(errors: unknown): void {
    if (Array.isArray(errors)) {
      errors.forEach((error: unknown) => {
        if (typeof error === 'object' && error !== null && 'path' in error && 'message' in error) {
          const typedError = error as Record<string, unknown>;
          const key = (typedError.path as unknown[])[0] as string;

          this.errors[key] = [typedError.message as string];
        }
      });

      return;
    }
  }

  get(key: string): string | undefined {
    if (this.errors[key]) {
      return this.errors[key][0];
    }
  }

  clear(key?: string): void {
    if (key === undefined) return;

    delete this.errors[key];
  }

  reset(): void {
    this.errors = {};
  }
}

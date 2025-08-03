// JSON-RPC client with static function architecture (configuration only)

// Case conversion utilities
function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function convertKeysToSnakeCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  }

  const converted: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnake(key);
    converted[snakeKey] = convertKeysToSnakeCase(value);
  }
  return converted;
}

function convertKeysToCamelCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  }

  const converted: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamel(key);
    converted[camelKey] = convertKeysToCamelCase(value);
  }
  return converted;
}

// Use static ID matching NEAR RPC documentation examples
const REQUEST_ID = 'dontcare';

// Types for client configuration
export interface ClientConfig {
  endpoint: string;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

// JSON-RPC request structure
export interface JsonRpcRequest<T = unknown> {
  jsonrpc: '2.0';
  id: string;
  method: string;
  params?: T;
}

// JSON-RPC response structure
export interface JsonRpcResponse<T = unknown> {
  jsonrpc: '2.0';
  id: string;
  result?: T;
  error?: JsonRpcError;
}

// JSON-RPC error structure
export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

// Custom error classes
export class JsonRpcClientError extends Error {
  constructor(
    message: string,
    public code?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'JsonRpcClientError';
  }
}

export class JsonRpcNetworkError extends Error {
  constructor(
    message: string,
    public originalError?: Error,
    public responseBody?: unknown
  ) {
    super(message);
    this.name = 'JsonRpcNetworkError';
  }
}

/**
 * NEAR RPC Client with static function architecture
 * This client only holds configuration and provides a makeRequest method
 * Individual RPC methods are provided as standalone functions that take this client as a parameter
 */
export class NearRpcClient {
  public readonly endpoint: string;
  public readonly headers: Record<string, string>;
  public readonly timeout: number;
  public readonly retries: number;

  constructor(config: string | ClientConfig) {
    if (typeof config === 'string') {
      this.endpoint = config;
      this.headers = {};
      this.timeout = 30000;
      this.retries = 3;
    } else {
      this.endpoint = config.endpoint;
      this.headers = config.headers || {};
      this.timeout = config.timeout || 30000;
      this.retries = config.retries || 3;
    }
  }

  /**
   * Make a raw JSON-RPC request
   * This is used internally by the standalone RPC functions
   */
  async makeRequest<TParams = unknown, TResult = unknown>(
    method: string,
    params?: TParams
  ): Promise<TResult> {
    // Convert camelCase params to snake_case for the RPC call
    // Also convert undefined to null for methods that expect null params
    const snakeCaseParams =
      params !== undefined ? convertKeysToSnakeCase(params) : null;

    const request: JsonRpcRequest<TParams | undefined> = {
      jsonrpc: '2.0',
      id: REQUEST_ID,
      method,
      params: snakeCaseParams as TParams | undefined,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...this.headers,
          },
          body: JSON.stringify(request),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        let jsonResponse;
        try {
          jsonResponse = await response.json();
        } catch (parseError) {
          // If we can't parse JSON and it's not a 2xx response, include status info
          if (!response.ok) {
            throw new JsonRpcNetworkError(
              `HTTP error! status: ${response.status} - Failed to parse JSON response`,
              parseError as Error
            );
          }
          throw new JsonRpcNetworkError(
            'Failed to parse JSON response',
            parseError as Error
          );
        }

        // Check for JSON-RPC error in the response
        if (jsonResponse.error) {
          throw new JsonRpcClientError(
            jsonResponse.error.message,
            jsonResponse.error.code,
            jsonResponse.error.data
          );
        }

        // If it's not a 2xx status and no JSON-RPC error, throw network error with body
        if (!response.ok) {
          throw new JsonRpcNetworkError(
            `HTTP error! status: ${response.status}`,
            undefined,
            jsonResponse
          );
        }

        // Convert snake_case response back to camelCase
        const camelCaseResult = jsonResponse.result
          ? convertKeysToCamelCase(jsonResponse.result)
          : jsonResponse.result;

        // Check if the result contains an error field (non-standard NEAR RPC error response)
        // This happens when validation is disabled and certain RPC errors occur
        if (
          camelCaseResult &&
          typeof camelCaseResult === 'object' &&
          'error' in camelCaseResult
        ) {
          const errorMessage = (camelCaseResult as any).error;
          throw new JsonRpcClientError(
            `RPC Error: ${errorMessage}`,
            -32000, // Generic RPC error code
            camelCaseResult
          );
        }

        return camelCaseResult as TResult;
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors or validation errors
        if (error instanceof JsonRpcClientError) {
          throw error;
        }

        // Don't retry if this is the last attempt
        if (attempt === this.retries) {
          break;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }

    throw new JsonRpcNetworkError(
      lastError?.message || 'Request failed after all retries',
      lastError || undefined
    );
  }

  /**
   * Create a new client with modified configuration
   */
  withConfig(config: Partial<ClientConfig>): NearRpcClient {
    return new NearRpcClient({
      endpoint: config.endpoint ?? this.endpoint,
      headers: config.headers ?? this.headers,
      timeout: config.timeout ?? this.timeout,
      retries: config.retries ?? this.retries,
    });
  }
}

// Default client instance for convenience
export const defaultClient = new NearRpcClient({
  endpoint: 'https://rpc.mainnet.near.org',
});

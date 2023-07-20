enum CodeResponse {
  Success = 200,
  Error = 500,
}

interface GoodResponse<T> {
  status: CodeResponse;
  data: T;
  message: string;
}

interface BadResponse {
  status: CodeResponse;
  message: string;
}

export { GoodResponse, BadResponse, CodeResponse };

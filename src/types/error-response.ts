export interface ErrorType {
  response: {
    data: {
      isLimitExceeded?: boolean;
      limitPrice?: number;
      message: string;
      status: number;
    };
  };
}

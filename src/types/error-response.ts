export interface ErrorType {
  response: {
    data: {
      isLimitExceeded?: boolean;
      limitPrice?: number;
      passwordNotMatch?: boolean;
      notGoodPassword?: boolean;
      message: string;
      status: number;
    };
  };
}

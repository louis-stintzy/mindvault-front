import { AxiosError } from 'axios';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

const knownErrorCodes = new Set([0, 1, 2, 11, 13, 14, 15, 16, 17, 18, 21, 22]);

function analyseError(error: AxiosError) {
  if (error.response) {
    const errorResponse = error.response.data as ErrorResponse[];
    const filteredError = errorResponse.filter((err) =>
      knownErrorCodes.has(err.errCode)
    );
    if (filteredError.length > 0) {
      return filteredError;
    }
    return [{ errCode: -1, errMessage: 'Unknown error' }];
  }
  return [{ errCode: -1, errMessage: 'Unknown error' }];
}

export default analyseError;

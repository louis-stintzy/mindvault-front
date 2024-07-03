import { AxiosError } from 'axios';
import knownErrorCodes from '../../constants/errCodes';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

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

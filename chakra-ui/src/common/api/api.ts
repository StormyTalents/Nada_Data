import {
  IAuthTokens,
  TokenRefreshRequest,
  applyAuthTokenInterceptor,
} from 'axios-jwt';
import axios, { AxiosError } from 'axios';

let BASE_URL = 'http://localhost:3000/api';
if (process.env?.REACT_APP_CLIENT_ENV === 'staging') {
  BASE_URL = 'https://staging-api.havenproject.io/api';
}

if (process.env?.REACT_APP_CLIENT_ENV === 'production') {
  BASE_URL = 'https://api.havenproject.io/api';
}

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL });

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string
): Promise<IAuthTokens | string> => {
  // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor (in our case 'axiosInstance')
  // because this will result in an infinite loop when trying to refresh the token.
  // Use the global axios client or a different instance
  const response = await axios.get(`${BASE_URL}/users/me`);

  // If your backend supports rotating refresh tokens, you may also choose to return an object containing both tokens:
  // return {
  //  accessToken: response.data.access_token,
  //  refreshToken: response.data.refresh_token
  //}

  return response.data.accessToken;
};

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

export default {
  axios: axiosInstance,
  requestRefresh,
  AxiosError,
};

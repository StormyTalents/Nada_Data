export interface Environment {
  apiBaseUrl: string;
  examBaseUrl: string;
  accessTokenKey: string;
  bearerPrefix: string;
  accessDeniedPath: string;
  expires?: number;
  secure?: boolean;
  domain?: string;
  tinyApiKey: 'ais7mlr7cwg83g8qr0yfyl5gu1fzu0l1a1jqxzwfxoqz6qcs';
  gtmId: string;
}
const env = process.env.REACT_APP_CLIENT_ENV || 'development';
// eslint-disable-next-line
const environment = require(`./environment.${env}`).default;
export default environment as Environment;

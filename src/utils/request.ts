import axios, { AxiosResponse } from "axios";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  reg_user_resumes_count: number;
}

export const BASE_URL = "https://startup-summer-2023-proxy.onrender.com/2.0";
export const X_SECRET_KEY = "GEU4nvd3rej*jeh.eqp";
let TOKEN = "";
let TOKEN_TYPE = "";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: `${BASE_URL}/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0`,
  headers: {
    "x-secret-key": X_SECRET_KEY,
  },
};

axios
  .request(config)
  .then((response: AxiosResponse<AuthResponse>) => {
    TOKEN = response.data.access_token;
    TOKEN_TYPE = response.data.token_type;
  })
  .catch((error) => {
    if (error.code) {
      throw new Error(error.message);
    }
  });

export const AUTHORIZATION = `${TOKEN_TYPE} ${TOKEN}`;
export const X_API_APP_ID =
  "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";

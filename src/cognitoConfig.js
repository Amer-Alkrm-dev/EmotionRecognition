const USER_POOL_ID = process.env.REACT_APP_USER_POOL || "";
const POOL_CLIENT = process.env.REACT_APP_POOL_CLIENT || "";

export const cognitoConfig = {
    UserPoolId: USER_POOL_ID,
    ClientId: POOL_CLIENT
  }
import { BaseUser } from '../../../../types';
import { RestEndpoints } from '../../../../enums';

import { client } from '../client';

export async function signUp(userInfo: BaseUser) {
  const response = await client.post<BaseUser>( RestEndpoints.SignUp, userInfo);

  return response;
};

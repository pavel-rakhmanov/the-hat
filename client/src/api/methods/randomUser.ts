import { BaseUser } from '../../../../types';

import { envVariableGetter } from '@/utils';
import { client } from '@/api/client';

const RANDOM_PERSON_URL = envVariableGetter('VUE_APP_RANDOM_USER_URL');

type RandomUserResponse = {
  results: [
    {
      name: {
        first: string
        last: string
      }
      login: {
        uuid: string
        username: string
        password: string
      }
      picture: {
        large: string
        medium: string
        thumbnail: string
      }
    }
  ]
  info: {
    seed: string
    results: number
    page: number
    version: string
  }
}

export async function randomUser(): Promise<Required<BaseUser>> {
  const response = await client.get<RandomUserResponse>(`${RANDOM_PERSON_URL}/api`);

  const randomUser = response.data.results[0];

  if (!randomUser) throw new Error(`Failed to get randomUser from '${URL}'`);

  return {
    id: randomUser.login.uuid,
    name: `${randomUser.name.first} ${randomUser.name.last}`,
    avatar: randomUser.picture.large
  }
};

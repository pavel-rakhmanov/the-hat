import axios from 'axios';

import { BaseUser } from '@/types';
import { uuid } from '@/utils';

const RANDOM_USER_URL = 'https://randomuser.me/api';

type RandomUserResponse = {
  results: [
    {
      name: {
        first: string;
        last: string;
      };
      login: {
        uuid: string;
        username: string;
        password: string;
      };
      picture: {
        large: string;
        medium: string;
        thumbnail: string;
      };
    }
  ];
  info: {
    results: number;
  };
}

export async function getRandomUser(salt?: string): Promise<BaseUser> {
  const id = uuid();
  const defaultUser: Required<BaseUser> = {
    id,
    name: `user ${id}`,
    avatar: 'public/img/default-avatar.png',
  };

  try {
    const response = await axios.get<RandomUserResponse>(RANDOM_USER_URL);

    const randomUser = (response.data?.results || []).pop();

    if (randomUser) {
      defaultUser.id = randomUser.login.uuid;
      defaultUser.name = `${randomUser.name.first} ${randomUser.name.last}`;
      defaultUser.avatar = randomUser.picture.medium;
    }
  } catch (e) {
    console.error(`Failed to get randomUser from '${RANDOM_USER_URL}': ${e}`);
  } finally {
    return defaultUser;
  }
}

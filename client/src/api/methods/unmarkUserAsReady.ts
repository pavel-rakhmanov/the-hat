import { BaseUser, BaseRoom } from '@/types';
import { RestEndpoints } from '@/enums';
import { client } from '@/api';

export async function unmarkUserAsReady(
  input: { userId: BaseUser['id'], roomId: BaseRoom['id'] }
) {
  return client.post(RestEndpoints.UnmarkUserAsReady, {
    ...input
  });
};

import { BaseUser, BaseRoom } from '@/types';
import { RestEndpoints } from '@/enums';
import { client } from '@/api';

export async function markUserAsReady(
  input: { userId: BaseUser['id'], roomId: BaseRoom['id'] }
) {
  return client.post(RestEndpoints.MarkUserAsReady, {
    ...input
  });
};

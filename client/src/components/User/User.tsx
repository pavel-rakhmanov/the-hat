import { defineComponent, createElement, PropType, computed } from '@vue/composition-api';

import { BaseUser } from '../../../../types';

import Avatar from '../Avatar';

import './User.scss';

export default defineComponent({
  name: 'user',
  props: {
    user: {
      type: Object as PropType<BaseUser>,
      required: true,
    },
  },
  setup: (props) => {
    const h = createElement;
    const { user } = props;

    return () => (
      <div class="user">
        <Avatar src={user.avatar} />
        <div class="user__info shadow secondary white--text">
          { user.name }
        </div>
      </div>
    )
  }
})

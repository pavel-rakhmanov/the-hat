import { defineComponent, createElement, computed } from '@vue/composition-api';

import { envVariableGetter } from '@/utils';

import './Avatar.scss';

const PUBLIC = envVariableGetter('VUE_APP_API_URL');

export default defineComponent({
  name: 'avatar',
  props: {
    src: {
      type: String,
      default: 'img/default-avatar.png'
    },
    size: {
      type: Number,
      default: 48,
    },
  },
  setup: (props) => {
    const h  = createElement;

    const src = computed(() => props.src.includes('http') ? props.src : `${PUBLIC}/${props.src}`);

    return ()  => (
      <div
        class="avatar avatar-wrapper secondary"
        style={`height: ${props.size}px; min-width: ${props.size}px; width: ${props.size}px;`}
      >
        <img class="avatar__img" src={src.value} alt="avatar"/>
      </div>
    )
  }
})

import { defineComponent, createElement } from '@vue/composition-api';

import './Icon.scss';

export default defineComponent({
  name: 'icon',
  props: {
    // see https://material.io/resources/icons/
    name: {
      type: String,
      required: true,
    },
  },
  setup: (props) => {
    const h = createElement;

    return () => <i class="icon material-icons">{ props.name }</i>
  }
});

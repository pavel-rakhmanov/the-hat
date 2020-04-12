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
    title: {
      type: String,
    },
  },
  setup: (props) => {
    const h = createElement;

    return () => <i class="icon material-icons" title={props.title}>{ props.name }</i>
  }
});

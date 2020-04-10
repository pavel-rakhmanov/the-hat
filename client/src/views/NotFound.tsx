import { defineComponent, createElement, onMounted, ref } from '@vue/composition-api';

import router, { PAGE_NAMES } from '@/router';

const REDIRECT_DELAY = 5;

export default defineComponent({
  name: PAGE_NAMES.NotFound,
  setup: () => {
    const h = createElement;
    
    const delay = ref(REDIRECT_DELAY);

    function goToMain () {
      router.push({ name: PAGE_NAMES.Main });
    };

    onMounted(() => {
      setInterval(() => {
        delay.value--;
      }, 1000)
      setTimeout(() => {
        goToMain()
      }, 1000 * REDIRECT_DELAY)
    })

    return () => (
      <div class="flex flex-column flex-auto align-self-center">
        <div
          class="d-block secondary-text font-regular"
          style="font-size: 20vw; text-align: center;"
        >
          { delay.value }
        </div>
      </div>
    )
  }
})
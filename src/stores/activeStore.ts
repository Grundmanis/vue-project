import type { ActiveStore } from '@/interfaces/ActiveStore'
import { reactive, watch } from 'vue'

export const activeStore: ActiveStore = reactive({
  active: 1,
  updatedStyles: {},
  config: {}
})

watch(activeStore, async (newStore, oldStore) => {
  // console.log("newStore", newStore);
  // console.log("oldStore", oldStore);
  // if (newQuestion.includes('?')) {
  //   loading.value = true
  //   answer.value = 'Thinking...'
  //   try {
  //     const res = await fetch('https://yesno.wtf/api')
  //     answer.value = (await res.json()).answer
  //   } catch (error) {
  //     answer.value = 'Error! Could not reach the API. ' + error
  //   } finally {
  //     loading.value = false
  //   }
  // }
})
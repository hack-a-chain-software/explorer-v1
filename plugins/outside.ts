import outside from "@venegrad/vue3-click-outside"

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.directive('outside', outside)
})

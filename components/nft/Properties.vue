<script setup lang="ts">
const props = defineProps<{
  contract: any
}>()

const nft = useNft(props.contract)
</script>

<template>
  <div
    class="grid gap-3 md:gap-6"
  >
    <template
      v-if="nft?.attributes.length > 0"
    >
      <LabelValue
        :value="value"
        :key="trait_type"
        :label="trait_type"
        v-for="{ value, trait_type } in nft.attributes"
      />
    </template>

    <span
      class="text-font-400"
    >
      No properties found for this NFT.
    </span>
  </div>
</template>

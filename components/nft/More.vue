<script setup lang="ts">

</script>

<template>
  <div
    class="
      gap-4
      grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bazk:grid-cols-5
    "
  >
    <NftCard
      v-for="n in 5"
      :key="'nft-' + n"
      :id="n + ''"
      name="HC - Smoked  #823"
      :class="[n === 5 && 'hidden bazk:block']"
      collection="Hack a Collection"
    />

    <div
      class="flex items-center justify-end bazk:hidden col-span-2 sm:col-span-3 md:col-span-4"
    >
      <NuxtLink
        to="/collections/1"
      >
        <Button
          size="medium"
          label="View full collection"
        />
      </NuxtLink>
    </div>
  </div>
</template>

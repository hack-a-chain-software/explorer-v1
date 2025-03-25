<script lang="ts" setup/>

<template>
  <div
    class="flex items-center justify-between"
  >
    <h1
      class="text-[28px] font-semibold leading-[150%] text-font-400"
    >
      <slot />
    </h1>

    <slot
      name="button"
    />
  </div>
</template>

<script lang="ts" setup />

<template>
  <div
    class="
      flex items-center justify-between bg-[linear-gradient(180deg,_#01D796_0%,_#009367_105.48%)]
      gap-2 rounded-xl lg:rounded-2xl py-6 lg:py-[52px] px-4 lg:px-[48px]"
  >
    <div
      class="flex flex-col justify-between gap-4 lg:gap-6 w-full"
    >
      <h1
        class="
          text-font-400
          font-semibold lg:font-[700]
          text-xl lg:text-[40px]
          leading-[28px] lg:leading-[140%]"
      >
        Explore Kadena Blockchain
      </h1>

      <SearchInput />
    </div>

    <div
      class="hidden xl:flex bg-gray-800 rounded-xl w-full max-w-[420px] lg:h-[132px] items-center justify-center"
    >
      <IconLogoWhite
        class="h-10"
      />
    </div>
  </div>
</template>

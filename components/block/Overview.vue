<script setup lang="ts">
defineProps<{
  hash: string;
  nonce: string;
  weight: string;
  target: string;
  adjacents: string;
  epochStart: string;
  featureFlags: number;
  chainwebVersion: string;
}>()

const {
  blockchainTooltipData
} = useAppConfig()
</script>

<template>
  <Divide>
    <DivideItem>
      <LabelValue
        label="Target"
        :value="target"
        :description="blockchainTooltipData.block.overview.target"
      />

      <LabelValue
        withCopy
        label="Hash"
        :value="hash"
        :description="blockchainTooltipData.block.overview.hash"
      />

      <LabelValue
        label="Total Fees"
        value="-"
        :description="blockchainTooltipData.block.overview.totalFees"
      />
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Nonce"
        :value="nonce"
        :description="blockchainTooltipData.block.overview.nonce"
      />

      <LabelValue
        label="Weight"
        :value="weight"
        :description="blockchainTooltipData.block.overview.weight"
      />

      <LabelValue
        label="Epoch Start"
        :value="epochStart"
        :description="blockchainTooltipData.block.overview.epochStart"
      />

      <LabelValue
        label="Flags"
        value="-"
        :description="blockchainTooltipData.block.overview.flags"
      />
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Chainweb Version"
        :value="chainwebVersion"
        :description="blockchainTooltipData.block.overview.chainwebVersion"
      />

      <LabelValue
        label="Neighbors"
        :description="blockchainTooltipData.block.overview.neighbors"
      >
        <template #value>
          <Code
            :value="`Chain ${key} ${value}`"
            :key="`adjacent-${key}-${value}`"
            v-for="(value, key) in JSON.parse(adjacents)"
          />
        </template>
      </LabelValue>
    </DivideItem>
  </Divide>
</template>

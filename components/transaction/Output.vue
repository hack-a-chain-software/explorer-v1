<script setup lang="ts">
const props = defineProps<{
  logs: string;
  sigs: string;
  result: string;
  id: string | number;
  continuation: string;
}>()

const {
  blockchainTooltipData
} = useAppConfig()

const sigs = useTransactionSigs(props.sigs);

function parseJsonSafely(jsonString: any) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao fazer parse do JSON:", error);
    return '';
  }
}
</script>

<template>
  <Divide>
    <DivideItem>
      <LabelValue
        label="Transaction ID"
        :value="id"
        :description="blockchainTooltipData.transaction.output.transactionId"
      />

      <LabelValue
        label="Result"
        :description="blockchainTooltipData.transaction.output.result"
      >
        <template #value>
          <div
            class="flex flex-col gap-4"
          >
            <!-- <div
              class="flex items-center gap-2"
            >
              <IconSuccess class="h-6 w-6" />

              <span
                class="text-font-400"
              >
                Write Succeeded
              </span>
            </div> -->

            <Code
              :value="parseJsonSafely(result)"
            />
          </div>
        </template>
      </LabelValue>

      <LabelValue
        label="Logs"
        :value="JSON.parse(logs)"
        :description="blockchainTooltipData.transaction.output.logs"
      />
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Signatures"
        v-for="{ sig } in sigs"
        :key="sig"
        :description="blockchainTooltipData.transaction.output.signatures"
      >
        <template #value>
          <HighlightValue>
            {{ sig }}
          </HighlightValue>
        </template>
      </LabelValue>
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Continuation"
        :description="blockchainTooltipData.transaction.output.continuation"
      >
        <template #value>
          <Code
            :value="continuation"
          />
        </template>
      </LabelValue>
    </DivideItem>
  </Divide>
</template>

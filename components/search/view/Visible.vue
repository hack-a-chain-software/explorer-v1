<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
  (e: 'visible'): void;
  (e: 'hidden'): void;
}>();

const itemRef = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      emit('visible');
    } else {
      emit('hidden');
    }
  });
};

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  if (itemRef.value) {
    observer.value.observe(itemRef.value);
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <div ref="itemRef" class="max-w-full w-full">
    <slot></slot>
  </div>
</template>

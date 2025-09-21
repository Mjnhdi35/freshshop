<template>
  <UButton
    v-bind="$attrs"
    :class="buttonClass"
    :size="size"
    :color="color"
    :variant="variant"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <template v-if="loading" #leading>
      <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
    </template>

    <template v-else-if="icon" #leading>
      <UIcon :name="icon" />
    </template>

    <slot />

    <template v-if="trailingIcon" #trailing>
      <UIcon :name="trailingIcon" />
    </template>
  </UButton>
</template>

<script setup lang="ts">
interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "primary"
    | "gray"
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo";
  variant?: "solid" | "outline" | "soft" | "ghost" | "link";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  trailingIcon?: string;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "primary",
  variant: "solid",
  disabled: false,
  loading: false,
  fullWidth: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClass = computed(() => {
  const classes = [];

  if (props.fullWidth) {
    classes.push("w-full");
  }

  if (props.loading) {
    classes.push("cursor-not-allowed");
  }

  return classes.join(" ");
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

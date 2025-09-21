<template>
  <UAlert
    :color="color"
    :variant="variant"
    :icon="icon"
    :title="title"
    :description="description"
    :class="alertClass"
    :ui="alertUi"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <template v-if="showClose && $slots.close" #close>
      <slot name="close" />
    </template>
  </UAlert>
</template>

<script setup lang="ts">
interface Props {
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
  variant?: "solid" | "soft" | "outline" | "left-accent";
  icon?: string;
  title?: string;
  description?: string;
  showClose?: boolean;
  closable?: boolean;
  dismissible?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: "blue",
  variant: "soft",
  showClose: false,
  closable: false,
  dismissible: false,
  size: "md",
  fullWidth: false,
});

const emit = defineEmits<{
  close: [];
}>();

const alertClass = computed(() => {
  const classes = [];

  if (props.fullWidth) {
    classes.push("w-full");
  }

  return classes.join(" ");
});

const alertUi = computed(() => {
  const ui: any = {};

  switch (props.size) {
    case "sm":
      ui.padding = "p-3";
      ui.title = "text-sm font-medium";
      ui.description = "text-xs";
      break;
    case "md":
      ui.padding = "p-4";
      ui.title = "text-base font-medium";
      ui.description = "text-sm";
      break;
    case "lg":
      ui.padding = "p-6";
      ui.title = "text-lg font-medium";
      ui.description = "text-base";
      break;
  }

  return ui;
});

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <UCard :class="cardClass" :ui="cardUi">
    <template v-if="$slots.header" #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 v-if="title" class="text-lg font-semibold text-gray-900">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-sm text-gray-600 mt-1">
            {{ subtitle }}
          </p>
        </div>
        <div v-if="$slots.actions" class="flex items-center gap-2">
          <slot name="actions" />
        </div>
      </div>
    </template>

    <div :class="contentClass">
      <slot />
    </div>

    <template v-if="$slots.footer" #footer>
      <div class="flex items-center justify-between">
        <slot name="footer" />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  hoverable?: boolean;
  clickable?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  padding: "md",
  shadow: "sm",
  rounded: "lg",
  hoverable: false,
  clickable: false,
  fullWidth: false,
});

const cardClass = computed(() => {
  const classes = [];

  if (props.fullWidth) {
    classes.push("w-full");
  }

  if (props.hoverable) {
    classes.push("hover:shadow-lg transition-shadow duration-200");
  }

  if (props.clickable) {
    classes.push("cursor-pointer hover:shadow-lg transition-all duration-200");
  }

  return classes.join(" ");
});

const contentClass = computed(() => {
  const classes = [];

  switch (props.padding) {
    case "none":
      classes.push("p-0");
      break;
    case "sm":
      classes.push("p-3");
      break;
    case "md":
      classes.push("p-4");
      break;
    case "lg":
      classes.push("p-6");
      break;
  }

  return classes.join(" ");
});

const cardUi = computed(() => ({
  rounded: `rounded-${props.rounded}`,
  shadow: props.shadow === "none" ? "shadow-none" : `shadow-${props.shadow}`,
}));
</script>

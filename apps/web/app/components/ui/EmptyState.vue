<template>
  <div :class="containerClass">
    <!-- Icon -->
    <div v-if="icon" :class="iconClass">
      <UIcon :name="icon" />
    </div>

    <!-- Image -->
    <div v-else-if="image" class="mb-6">
      <img :src="image" :alt="title" class="mx-auto h-24 w-24 object-contain" />
    </div>

    <!-- Title -->
    <h3 v-if="title" :class="titleClass">
      {{ title }}
    </h3>

    <!-- Description -->
    <p v-if="description" :class="descriptionClass">
      {{ description }}
    </p>

    <!-- Action Button -->
    <div v-if="$slots.action || actionText" class="mt-6">
      <slot name="action">
        <UButton
          v-if="actionText"
          :color="actionColor"
          :variant="actionVariant"
          :size="actionSize"
          @click="handleAction"
        >
          {{ actionText }}
        </UButton>
      </slot>
    </div>

    <!-- Additional Content -->
    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string;
  image?: string;
  title?: string;
  description?: string;
  actionText?: string;
  actionColor?:
    | "primary"
    | "gray"
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo";
  actionVariant?: "solid" | "outline" | "soft" | "ghost" | "link";
  actionSize?: "xs" | "sm" | "md" | "lg" | "xl";
  size?: "sm" | "md" | "lg";
  center?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  actionColor: "primary",
  actionVariant: "solid",
  actionSize: "md",
  size: "md",
  center: true,
});

const emit = defineEmits<{
  action: [];
}>();

const containerClass = computed(() => {
  const classes = ["py-12 px-4"];

  if (props.center) {
    classes.push("text-center");
  }

  return classes.join(" ");
});

const iconClass = computed(() => {
  const classes = ["mx-auto mb-4"];

  switch (props.size) {
    case "sm":
      classes.push("h-12 w-12 text-gray-400");
      break;
    case "md":
      classes.push("h-16 w-16 text-gray-400");
      break;
    case "lg":
      classes.push("h-20 w-20 text-gray-400");
      break;
  }

  return classes.join(" ");
});

const titleClass = computed(() => {
  const classes = ["font-medium text-gray-900"];

  switch (props.size) {
    case "sm":
      classes.push("text-lg");
      break;
    case "md":
      classes.push("text-xl");
      break;
    case "lg":
      classes.push("text-2xl");
      break;
  }

  return classes.join(" ");
});

const descriptionClass = computed(() => {
  const classes = ["text-gray-500 mt-2"];

  switch (props.size) {
    case "sm":
      classes.push("text-sm");
      break;
    case "md":
      classes.push("text-base");
      break;
    case "lg":
      classes.push("text-lg");
      break;
  }

  return classes.join(" ");
});

const handleAction = () => {
  emit("action");
};
</script>

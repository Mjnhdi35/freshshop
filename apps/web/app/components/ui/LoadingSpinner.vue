<template>
  <div :class="containerClass">
    <div :class="spinnerClass">
      <UIcon name="i-heroicons-arrow-path" :class="iconClass" />
    </div>
    <p v-if="text" :class="textClass">
      {{ text }}
    </p>
  </div>
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
  text?: string;
  center?: boolean;
  fullScreen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "primary",
  center: true,
  fullScreen: false,
});

const containerClass = computed(() => {
  const classes = ["flex flex-col items-center justify-center gap-3"];

  if (props.center) {
    classes.push("text-center");
  }

  if (props.fullScreen) {
    classes.push("fixed inset-0 bg-white bg-opacity-75 z-50");
  } else {
    classes.push("py-8");
  }

  return classes.join(" ");
});

const spinnerClass = computed(() => {
  const classes = ["animate-spin"];

  switch (props.size) {
    case "xs":
      classes.push("h-4 w-4");
      break;
    case "sm":
      classes.push("h-6 w-6");
      break;
    case "md":
      classes.push("h-8 w-8");
      break;
    case "lg":
      classes.push("h-12 w-12");
      break;
    case "xl":
      classes.push("h-16 w-16");
      break;
  }

  return classes.join(" ");
});

const iconClass = computed(() => {
  const classes = ["w-full h-full"];

  switch (props.color) {
    case "primary":
      classes.push("text-blue-600");
      break;
    case "gray":
      classes.push("text-gray-600");
      break;
    case "blue":
      classes.push("text-blue-600");
      break;
    case "green":
      classes.push("text-green-600");
      break;
    case "red":
      classes.push("text-red-600");
      break;
    case "yellow":
      classes.push("text-yellow-600");
      break;
    case "purple":
      classes.push("text-purple-600");
      break;
    case "pink":
      classes.push("text-pink-600");
      break;
    case "indigo":
      classes.push("text-indigo-600");
      break;
  }

  return classes.join(" ");
});

const textClass = computed(() => {
  const classes = [];

  switch (props.size) {
    case "xs":
      classes.push("text-xs");
      break;
    case "sm":
      classes.push("text-sm");
      break;
    case "md":
      classes.push("text-base");
      break;
    case "lg":
      classes.push("text-lg");
      break;
    case "xl":
      classes.push("text-xl");
      break;
  }

  classes.push("text-gray-600");

  return classes.join(" ");
});
</script>

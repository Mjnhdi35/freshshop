<template>
  <UBadge :color="color" :variant="variant" :size="size" :class="badgeClass">
    <template v-if="icon" #leading>
      <UIcon :name="icon" />
    </template>

    <slot />

    <template v-if="trailingIcon" #trailing>
      <UIcon :name="trailingIcon" />
    </template>
  </UBadge>
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
  variant?: "solid" | "soft" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: string;
  trailingIcon?: string;
  rounded?: boolean;
  dot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: "primary",
  variant: "soft",
  size: "sm",
  rounded: false,
  dot: false,
});

const badgeClass = computed(() => {
  const classes = [];

  if (props.rounded) {
    classes.push("rounded-full");
  }

  if (props.dot) {
    classes.push("w-2 h-2 p-0");
  }

  return classes.join(" ");
});
</script>

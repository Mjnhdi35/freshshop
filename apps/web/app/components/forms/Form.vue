<template>
  <form :class="formClass" @submit.prevent="handleSubmit">
    <slot />

    <!-- Form Actions -->
    <div v-if="showActions" :class="actionsClass">
      <slot name="actions">
        <div class="flex gap-3">
          <UButton
            v-if="cancelText"
            :color="cancelColor"
            :variant="cancelVariant"
            :size="buttonSize"
            :disabled="loading"
            @click="handleCancel"
          >
            {{ cancelText }}
          </UButton>
          <UButton
            v-if="submitText"
            :color="submitColor"
            :variant="submitVariant"
            :size="buttonSize"
            :loading="loading"
            :disabled="disabled"
            type="submit"
          >
            {{ submitText }}
          </UButton>
        </div>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: Record<string, any>;
  loading?: boolean;
  disabled?: boolean;
  showActions?: boolean;
  submitText?: string;
  cancelText?: string;
  submitColor?:
    | "primary"
    | "gray"
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo";
  cancelColor?:
    | "primary"
    | "gray"
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo";
  submitVariant?: "solid" | "outline" | "soft" | "ghost" | "link";
  cancelVariant?: "solid" | "outline" | "soft" | "ghost" | "link";
  buttonSize?: "xs" | "sm" | "md" | "lg" | "xl";
  actionsAlign?: "left" | "center" | "right";
  spacing?: "none" | "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  showActions: true,
  submitColor: "primary",
  cancelColor: "gray",
  submitVariant: "solid",
  cancelVariant: "outline",
  buttonSize: "md",
  actionsAlign: "right",
  spacing: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: Record<string, any>];
  submit: [data: Record<string, any>];
  cancel: [];
}>();

const formClass = computed(() => {
  const classes = ["space-y-6"];

  switch (props.spacing) {
    case "none":
      classes.push("space-y-0");
      break;
    case "sm":
      classes.push("space-y-3");
      break;
    case "md":
      classes.push("space-y-6");
      break;
    case "lg":
      classes.push("space-y-8");
      break;
  }

  return classes.join(" ");
});

const actionsClass = computed(() => {
  const classes = ["pt-6 border-t border-gray-200"];

  switch (props.actionsAlign) {
    case "left":
      classes.push("flex justify-start");
      break;
    case "center":
      classes.push("flex justify-center");
      break;
    case "right":
      classes.push("flex justify-end");
      break;
  }

  return classes.join(" ");
});

const handleSubmit = () => {
  if (!props.disabled && !props.loading) {
    emit("submit", props.modelValue || {});
  }
};

const handleCancel = () => {
  emit("cancel");
};
</script>

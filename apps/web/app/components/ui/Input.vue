<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <UInput
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClass"
      :size="size"
      :color="error ? 'red' : color"
      :variant="variant"
      :icon="icon"
      :trailing-icon="trailingIcon"
      :loading="loading"
      v-bind="$attrs"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <div v-if="error" class="text-sm text-red-600 flex items-center gap-1">
      <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4" />
      {{ error }}
    </div>

    <div v-else-if="hint" class="text-sm text-gray-500">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
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
  variant?: "outline" | "none";
  icon?: string;
  trailingIcon?: string;
  loading?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  size: "md",
  color: "primary",
  variant: "outline",
  disabled: false,
  readonly: false,
  required: false,
  fullWidth: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const inputId = computed(
  () => `input-${Math.random().toString(36).substr(2, 9)}`,
);

const inputValue = computed({
  get: () => props.modelValue || "",
  set: (value) => emit("update:modelValue", value),
});

const inputClass = computed(() => {
  const classes = [];

  if (props.fullWidth) {
    classes.push("w-full");
  }

  if (props.error) {
    classes.push("border-red-300 focus:border-red-500 focus:ring-red-500");
  }

  return classes.join(" ");
});

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};
</script>

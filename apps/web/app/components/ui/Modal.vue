<template>
  <UModal
    v-model="isOpen"
    :ui="modalUi"
    :prevent-close="preventClose"
    @close="handleClose"
  >
    <UCard :ui="cardUi">
      <!-- Header -->
      <template v-if="$slots.header || title" #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 v-if="title" class="text-lg font-semibold text-gray-900">
              {{ title }}
            </h3>
            <p v-if="subtitle" class="text-sm text-gray-600 mt-1">
              {{ subtitle }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <slot name="header-actions" />
            <UButton
              v-if="showCloseButton"
              variant="ghost"
              size="sm"
              icon="i-heroicons-x-mark"
              @click="handleClose"
            />
          </div>
        </div>
      </template>

      <!-- Content -->
      <div :class="contentClass">
        <slot />
      </div>

      <!-- Footer -->
      <template v-if="$slots.footer || showDefaultFooter" #footer>
        <div class="flex items-center justify-between">
          <slot name="footer">
            <div v-if="showDefaultFooter" class="flex gap-3">
              <UButton
                v-if="cancelText"
                :color="cancelColor"
                :variant="cancelVariant"
                :size="buttonSize"
                @click="handleCancel"
              >
                {{ cancelText }}
              </UButton>
              <UButton
                v-if="confirmText"
                :color="confirmColor"
                :variant="confirmVariant"
                :size="buttonSize"
                :loading="confirmLoading"
                :disabled="confirmDisabled"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </UButton>
            </div>
          </slot>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  subtitle?: string;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  padding?: "none" | "sm" | "md" | "lg";
  showCloseButton?: boolean;
  preventClose?: boolean;
  showDefaultFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmColor?:
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
  confirmVariant?: "solid" | "outline" | "soft" | "ghost" | "link";
  cancelVariant?: "solid" | "outline" | "soft" | "ghost" | "link";
  buttonSize?: "xs" | "sm" | "md" | "lg" | "xl";
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  padding: "md",
  showCloseButton: true,
  preventClose: false,
  showDefaultFooter: false,
  confirmColor: "primary",
  cancelColor: "gray",
  confirmVariant: "solid",
  cancelVariant: "outline",
  buttonSize: "md",
  confirmLoading: false,
  confirmDisabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
  confirm: [];
  cancel: [];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const modalUi = computed(() => ({
  width: `w-${props.size}`,
}));

const cardUi = computed(() => ({
  rounded: "rounded-lg",
  shadow: "shadow-xl",
  ring: "ring-1 ring-gray-200",
}));

const contentClass = computed(() => {
  const classes = [];

  switch (props.padding) {
    case "none":
      classes.push("p-0");
      break;
    case "sm":
      classes.push("p-4");
      break;
    case "md":
      classes.push("p-6");
      break;
    case "lg":
      classes.push("p-8");
      break;
  }

  return classes.join(" ");
});

const handleClose = () => {
  emit("close");
  emit("update:modelValue", false);
};

const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  emit("cancel");
  emit("update:modelValue", false);
};
</script>

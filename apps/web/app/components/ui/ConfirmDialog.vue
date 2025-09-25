<template>
  <Modal
    v-model="open"
    :title="title"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :confirm-loading="loading"
    show-default-footer
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <slot>{{ message }}</slot>
  </Modal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Xác nhận",
  message: "Bạn có chắc chắn muốn tiếp tục?",
  confirmText: "Đồng ý",
  cancelText: "Hủy",
  loading: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
  cancel: [];
}>();

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

const onConfirm = () => emit("confirm");
const onCancel = () => emit("cancel");
</script>

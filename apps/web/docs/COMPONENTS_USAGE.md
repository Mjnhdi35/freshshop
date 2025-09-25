# UI Components Usage

## Button

```vue
<Button
  color="blue"
  icon="i-heroicons-plus"
  @click="doSomething"
>Thêm mới</Button>
```

## Card

```vue
<Card title="Tiêu đề" subtitle="Mô tả">
  Nội dung
  <template #actions>
    <Button variant="outline">Hành động</Button>
  </template>
</Card>
```

## Modal

```vue
<Modal
  v-model="open"
  title="Xác nhận"
  confirm-text="Đồng ý"
  @confirm="onConfirm"
>
  Bạn có chắc?
</Modal>
```

## SearchBar

```vue
<SearchBar v-model="q" @search="onSearch" :suggestions="suggestions" />
```

## ProductGrid

```vue
<ProductGrid :products="items" :loading="loading" @add-to-cart="addToCart" />
```

## ConfirmDialog

```vue
<ConfirmDialog v-model="open" title="Xóa sản phẩm" @confirm="doDelete">
  Bạn có chắc muốn xóa?
</ConfirmDialog>
```

## Thông báo (Toast)

```ts
const { success, error } = useNotify();
success("Thêm vào giỏ hàng thành công");
```

## Color Mode Toggle

- Có sẵn trong `layout/Header.vue`, gọi `useColorMode()` để điều khiển chế độ.

<template>
  <div class="relative">
    <UInput
      v-model="searchQuery"
      :placeholder="placeholder"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      icon="i-heroicons-magnifying-glass"
      class="w-full"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="handleSearch"
      @keydown.escape="handleEscape"
    />

    <!-- Search Suggestions -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="suggestion.id || index"
        class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
        :class="{ 'bg-blue-50': selectedIndex === index }"
        @click="selectSuggestion(suggestion)"
        @mouseenter="selectedIndex = index"
      >
        <div class="flex items-center gap-3">
          <UIcon
            v-if="suggestion.type === 'product'"
            name="i-heroicons-shopping-bag"
            class="h-5 w-5 text-gray-400"
          />
          <UIcon
            v-else-if="suggestion.type === 'category'"
            name="i-heroicons-tag"
            class="h-5 w-5 text-gray-400"
          />
          <UIcon
            v-else
            name="i-heroicons-magnifying-glass"
            class="h-5 w-5 text-gray-400"
          />

          <div class="flex-1">
            <div class="font-medium text-gray-900">
              {{ suggestion.title }}
            </div>
            <div v-if="suggestion.subtitle" class="text-sm text-gray-500">
              {{ suggestion.subtitle }}
            </div>
          </div>

          <UIcon
            v-if="suggestion.type === 'product'"
            name="i-heroicons-arrow-right"
            class="h-4 w-4 text-gray-400"
          />
        </div>
      </div>
    </div>

    <!-- Recent Searches -->
    <div
      v-if="showRecentSearches && recentSearches.length > 0 && !searchQuery"
      class="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <div class="px-4 py-2 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700"
            >Tìm kiếm gần đây</span
          >
          <UButton variant="ghost" size="xs" @click="clearRecentSearches">
            Xóa tất cả
          </UButton>
        </div>
      </div>

      <div
        v-for="(search, index) in recentSearches"
        :key="index"
        class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
        @click="selectRecentSearch(search)"
      >
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-clock" class="h-4 w-4 text-gray-400" />
          <span class="text-sm text-gray-700">{{ search }}</span>
        </div>
        <UButton
          variant="ghost"
          size="xs"
          icon="i-heroicons-x-mark"
          @click.stop="removeRecentSearch(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SearchSuggestion {
  id?: string;
  title: string;
  subtitle?: string;
  type?: "product" | "category" | "search";
}

interface Props {
  modelValue?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  suggestions?: SearchSuggestion[];
  showSuggestions?: boolean;
  showRecentSearches?: boolean;
  recentSearches?: string[];
  debounceMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Tìm kiếm sản phẩm...",
  size: "md",
  disabled: false,
  loading: false,
  suggestions: () => [],
  showSuggestions: true,
  showRecentSearches: true,
  recentSearches: () => [],
  debounceMs: 300,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  search: [query: string];
  suggestionSelect: [suggestion: SearchSuggestion];
  recentSearchSelect: [search: string];
  clearRecentSearches: [];
}>();

const searchQuery = ref(props.modelValue || "");
const selectedIndex = ref(-1);
const showSuggestions = ref(false);

let debounceTimer: NodeJS.Timeout | null = null;

const handleInput = () => {
  emit("update:modelValue", searchQuery.value);

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    if (searchQuery.value.trim()) {
      emit("search", searchQuery.value.trim());
    }
  }, props.debounceMs);

  showSuggestions.value = searchQuery.value.length > 0;
};

const handleFocus = () => {
  if (props.showRecentSearches && !searchQuery.value) {
    showSuggestions.value = true;
  }
};

const handleBlur = () => {
  // Delay hiding suggestions to allow clicking on them
  setTimeout(() => {
    showSuggestions.value = false;
    selectedIndex.value = -1;
  }, 150);
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit("search", searchQuery.value.trim());
    showSuggestions.value = false;
  }
};

const handleEscape = () => {
  showSuggestions.value = false;
  selectedIndex.value = -1;
};

const selectSuggestion = (suggestion: SearchSuggestion) => {
  searchQuery.value = suggestion.title;
  emit("update:modelValue", suggestion.title);
  emit("suggestionSelect", suggestion);
  showSuggestions.value = false;
};

const selectRecentSearch = (search: string) => {
  searchQuery.value = search;
  emit("update:modelValue", search);
  emit("recentSearchSelect", search);
  showSuggestions.value = false;
};

const removeRecentSearch = (index: number) => {
  // This would typically emit an event to update the parent's recent searches
  console.log("Remove recent search at index:", index);
};

const clearRecentSearches = () => {
  emit("clearRecentSearches");
};

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value = newValue || "";
  },
);
</script>

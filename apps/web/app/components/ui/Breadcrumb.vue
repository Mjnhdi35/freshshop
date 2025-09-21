<template>
  <nav :class="navClass" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li
        v-for="(item, index) in items"
        :key="item.name"
        class="flex items-center"
      >
        <!-- Separator -->
        <UIcon
          v-if="index > 0"
          name="i-heroicons-chevron-right"
          class="h-4 w-4 text-gray-400 mx-2"
        />

        <!-- Breadcrumb Item -->
        <div class="flex items-center">
          <!-- Icon -->
          <UIcon
            v-if="item.icon"
            :name="item.icon"
            class="h-4 w-4 text-gray-400 mr-2"
          />

          <!-- Link or Text -->
          <NuxtLink
            v-if="item.href && index < items.length - 1"
            :to="item.href"
            class="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
          <span
            v-else
            class="text-sm font-medium"
            :class="
              index === items.length - 1 ? 'text-gray-900' : 'text-gray-500'
            "
          >
            {{ item.name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string;
  href?: string;
  icon?: string;
}

interface Props {
  items: BreadcrumbItem[];
  size?: "sm" | "md" | "lg";
  separator?: string;
  showHome?: boolean;
  homeIcon?: string;
  homeText?: string;
  homeHref?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  separator: "chevron-right",
  showHome: true,
  homeIcon: "i-heroicons-home",
  homeText: "Trang chủ",
  homeHref: "/",
});

const navClass = computed(() => {
  const classes = [];

  switch (props.size) {
    case "sm":
      classes.push("py-2");
      break;
    case "md":
      classes.push("py-3");
      break;
    case "lg":
      classes.push("py-4");
      break;
  }

  return classes.join(" ");
});

// Add home item if enabled
const breadcrumbItems = computed(() => {
  const items = [...props.items];

  if (props.showHome && items.length > 0) {
    items.unshift({
      name: props.homeText,
      href: props.homeHref,
      icon: props.homeIcon,
    });
  }

  return items;
});
</script>

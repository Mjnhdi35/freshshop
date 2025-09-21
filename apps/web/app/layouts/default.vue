<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Layout setup - components are handled in Header and Footer
</script>

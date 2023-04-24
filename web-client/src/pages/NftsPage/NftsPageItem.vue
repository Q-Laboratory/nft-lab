<template>
  <router-link
    class="nfts-page-item"
    :to="{ name: $routes.nftDetails, params: { id: props.title } }"
  >
    <img class="nfts-page-item__img" alt="nft" :src="props.link" />
    <span class="nfts-page-item__title">{{ props.title }}</span>
  </router-link>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    link?: string
  }>(),
  {
    title: 'random',
    link: '',
  },
)
</script>

<style lang="scss" scoped>
.nfts-page-item {
  display: grid;
  grid-gap: toRem(8);
}

.nfts-page-item__img {
  width: toRem(223);
  height: toRem(223);
  background: var(--white);
}
.nfts-page-item__title {
  font-weight: 600;
  color: var(--text-primary-main);
}
</style>

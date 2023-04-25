<template>
  <router-link
    class="nfts-page-item"
    :to="{ name: $routes.nftDetails, params: { id: props.title } }"
  >
    <div class="app-list-section-card__logo-container">
      <div class="app-list-section-card__logo-wrap">
        <div class="nfts-page-item__img-wrapper">
          <img class="nfts-page-item__img" alt="nft" :src="props.link" />
        </div>
      </div>
    </div>
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
  height: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--white);
  box-shadow: toRem(6) toRem(6) toRem(8) var(--shadow-primary);
  padding: toRem(12);
  grid-gap: toRem(8);
  border-radius: toRem(8);
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
}

.app-list-section-card__logo-container {
  position: relative;
  width: 100%;
}
.app-list-section-card__logo-wrap {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-bottom: 0;
  height: 100%;
}

.nfts-page-item__img-wrapper {
  max-height: toRem(250);
  min-height: toRem(250);
  height: 100%;
}

.nfts-page-item__img {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: contain;
  border-radius: inherit;
  background: var(--app-bg);
}
.nfts-page-item__title {
  margin-top: toRem(12);
  font-weight: 600;
  color: var(--text-primary-main);
}
</style>

<template>
  <section class="section">
    <header
      class="section__header"
    >
      <div v-if="title || description">
        <h1
          v-if="title"
          class="section__title"
          v-text="title"
        />
        <p
          v-if="description"
          class="section__description"
          v-text="description"
        />
      </div>
      <slot name="header"></slot>
    </header>
    <div class="section__body">
      <slot />
    </div>
    <div class="section__footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'TrueSection',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  padding: 30px;
  background-color: white;
  &__header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  &__footer {
    margin-top: 30px;
  }
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>

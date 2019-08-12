<template>
   <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    _setSlideWidth() {
      this.children = this.$refs.slideGroup.children;
      let width = 0;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        width += slideWidth;
      }
    }
  }
};
</script>


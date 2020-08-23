<template>
  <div class="confirm-container">
    <div class="card">
      <h3>{{confirmBody}}</h3>
      <div class="button-container">
        <button id="confirmed" class="btn-create btn-text-action" @click="confirmation">Confirm</button>
        <button id="declined" class="btn-delete btn-text-action" @click="confirmation">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["confirmBody"],

  methods: {
    confirmation() {
      event.target.id === "confirmed"
        ? this.$emit("confirmation", true)
        : this.$emit("confirmation", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-container {
  // width: 25rem;
  // height: 8rem;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  width: 15rem;
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}
</style>
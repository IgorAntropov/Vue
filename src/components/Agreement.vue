<template>
  <div class="agreement-wrapper flex-center" ref="agreement_wrapper">
    <div class="agreement-content flex-center">
      <span>Are you sure?</span>

      <div class="agreement-action flex-text-between">
        <button
            class="btn btn-danger"
            @click.stop="closeAgreement"
        >
          <fa icon="close" />
        </button>

        <button
            class="btn btn-success"
            @click.stop="agreeAgreement"
        >
          <fa icon="check" />
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AgreementComp',
  methods: {
    onClickOutside: function (event) {
      if (event.target !== this.$refs['popup_wrapper']) {
        return;
      }

      this.closeAgreement();
    },
    closeAgreement: function () {
      this.$emit('closeAgreement');
    },
    agreeAgreement: function () {
      this.$emit('agreeAgreement');
    }
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.onClickOutside);
  }
}
</script>

<style scoped>
.agreement-wrapper {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: rgba(150, 140, 140, .4);
}

.agreement-content {
  width: 300px;
  height: 150px;
  position: fixed;
  top: 50px;
  background-color: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  border: 1px solid #656565;
  flex-direction: column;
}

.agreement-action {
  width: 100%;
  justify-content: space-evenly;
  margin: 10px;
}
</style>
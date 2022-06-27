<template>
  <div class="popup-wrapper flex-center" ref="popup_wrapper">
    <div class="popup">
      <div class="popup-header flex-text-between">
        <span>{{popupName}}</span>
        <button
            class="btn btn-danger"
            @click.stop="closePopup"
        >
          <fa icon="close" />
        </button>
      </div>

      <div class="popup-content">
        <slot/>
      </div>

      <div class="popup-footer">
        <button
            class="btn btn-success"
            @click.stop="acceptPopup"
        >
          <fa icon="check" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupComp',
  props: {
    popupName: {
      type: String,
      default: 'Popup name'
    }
  },
  methods: {
    onClickOutside: function (event) {
      if (event.target !== this.$refs['popup_wrapper']) {
        return;
      }

      this.closePopup();
    },
    closePopup: function () {
      this.$emit('closePopup');
    },
    acceptPopup: function () {
      this.$emit('acceptPopup');
    }
  },
  computed: {},
  mounted() {
    this.$el.getElementsByTagName('input')[0].focus();

    document.addEventListener('click', this.onClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.onClickOutside);
  }
}
</script>

<style scoped>
.popup-wrapper {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: rgba(150, 140, 140, .4);
}

.popup {
  width: 300px;
  height: 300px;
  position: fixed;
  top: 50px;
  background-color: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  border: 1px solid #656565;
}

.popup .popup-header,
.popup .popup-footer {
  height: 50px;
  width: 100%;
  background-color: #c7c6c6;
  color: #656565;
}

.popup > div > * {
  margin: 5px;
}

.popup .popup-content {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.popup .popup-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

:slotted(input) {
  height: 30px;
  font-size: 18px;
}
</style>
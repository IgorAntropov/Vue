<template>
  <li @click.stop="toggleChildren" v-if="item.name !== ''">
    <div class="flex-text-between">
      <div>
        <span>{{ item.name }}</span>
        <span v-if="isFolder">{{ itemSuffix }}</span>
      </div>
      <div class="action" v-if="lengthItem > 0" >
        <button
            class="btn btn-success"
            @click.stop="toggleAddChildMode"
        >
          <fa icon="plus"/>
        </button>
        <button
            class="btn btn-warning"
            @click.stop="toggleEditMode"
        >
          <fa icon="pen-to-square"/>
        </button>
        <button
            class="btn btn-danger"
            @click.stop="toggleRemoveMode"
        >
          <fa icon="trash"/>
        </button>
      </div>
    </div>

    <ul v-if="item.children?.length && isOpen">
      <node-item v-for="(childItem, idx) in item.children" :key="idx" :item="childItem" />
    </ul>

    <Popup
        v-if="isEditMode"
        @acceptPopup="updateChild"
        @closePopup="closePopup"
        @click="offParentToggles"
        :popupName="item.name"
    >
      <div class="flex-text-start">
        <span>New name: </span>
      </div>
      <input placeholder="Name" v-model="newItemName" ref="input_for_focus">
    </Popup>

    <Popup
        v-if="isAddChildMode"
        @acceptPopup="addChild"
        @closePopup="closePopup"
        @click="offParentToggles"
        popupName="Create new child node"
    >
      <div class="flex-text-start">
        <span>New node name: </span>
      </div>
      <input placeholder="Name" v-model="newItemName" ref="input_for_focus">
    </Popup>

    <Agreement
        v-if="isRemoveMode"
        @closeAgreement="closeAgreement"
        @agreeAgreement="remove"
        @click="offParentToggles"
    >
    </Agreement>
  </li>

</template>

<script>
import Popup from "@/components/Popup";
import Agreement from "@/components/Agreement";

export default {
  name: "NodeItem",
  components: {
    Popup,
    Agreement
  },
  props: {
    item: Object
  },
  methods: {
    offParentToggles() {
      this.offClick = true;
    },
    toggleChildren() {
      if (!this.offClick) {
        this.isOpen = !this.isOpen;
      }
    },
    toggleEditMode() {
      if (!this.offClick) {
        this.isEditMode = !this.isEditMode;
      }
    },
    toggleAddChildMode() {
      if (!this.offClick) {
        this.isAddChildMode = !this.isAddChildMode;
      }
    },
    toggleRemoveMode() {
      if (!this.offClick) {
        this.isRemoveMode = !this.isRemoveMode;
      }
    },
    addChild() {
      if (this.newItemName !== '') {
        this.$store.dispatch('ADD_NEW_CHILD', {newName: this.newItemName, item: this.item});
      }

      this.rollBackOffClick();
      this.toggleAddChildMode();
    },
    updateChild() {
      if (this.newItemName !== '') {
        this.$store.dispatch('CHANGE_NAME', {newName: this.newItemName, item: this.item});
      }

      this.rollBackOffClick();
      this.toggleEditMode();
    },
    remove() {
      this.$store.dispatch('REMOVE', this.item);

      this.lengthItem = Object.keys(this.$store.state).length;
      this.rollBackOffClick();
      this.toggleRemoveMode();
    },
    closeAgreement() {
      this.rollBackOffClick();
      this.toggleRemoveMode();
    },
    closePopup() {
      this.rollBackOffClick();

      if (this.isAddChildMode) {
        this.toggleAddChildMode();
      } else {
        this.toggleEditMode();
      }
    },
    rollBackOffClick() {
      this.offClick = false;
      this.newItemName = '';
    }
  },
  data() {
    return {
      offClick: false,
      isOpen: false,
      isAddChildMode: false,
      isEditMode: false,
      isRemoveMode: false,
      newItemName: '',
      lengthItem: Object.keys(this.$store.state).length
    }
  },
  computed: {
    isFolder: function () {
      return !!this.item?.children?.length;
    },
    itemSuffix: function () {
      return `[${this.isOpen ? '-' : '+'}]`;
    }
  },
}
</script>

<style scoped>
li {
  margin: 10px 0;
}

.action {
  margin-left: 15px;
}

.action > button {
  margin-left: 5px;
}
</style>
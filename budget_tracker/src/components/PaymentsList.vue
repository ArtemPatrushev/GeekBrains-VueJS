<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.id }}</td>
          <td>{{ payment.date }}</td>
          <td>{{ payment.category }}</td>
          <td>{{ payment.amount }}</td>
          <button class="icon-btn" @click="showContextMenu(payment)">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <ContextMenu
            v-if="showMenuForID === payment.id"
            :actions="contextActions"
            :item="{ ...payment }"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";
export default {
  name: "PaymentsList",
  components: {
    ContextMenu,
  },
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      paymentActions: [
        { name: "Edit", comp: "EditPaymentForm", itemName: "Payment" },
        { name: "Delete", comp: "ConfirmWindow", itemName: "Payment" },
      ],
      showMenuForID: null,
      contextActions: null,
    };
  },

  methods: {
    showContextMenu(payment) {
      if (!this.showMenuForID) {
        this.$context.show(payment, this.paymentActions);
      } else {
        this.$context.hide();
      }
    },
  },

  mounted() {
    this.$context.EventBus.$on("show", (data) => {
      this.contextActions = data.actions;
      this.showMenuForID = data.item.id;
    });

    this.$context.EventBus.$on("hide", () => {
      this.showMenuForID = null;
    });
  },
};
</script>

<style lang="sass" scoped>
table
  border-collapse: collapse
  text-align: left

tr
  border-bottom: 1px solid #333

td,
th
  padding: 15px 15px 5px 5px
</style>
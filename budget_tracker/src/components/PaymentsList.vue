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
        <tr v-for="(payment, index) in paymentsList" :key="payment.number">
          <td>{{ payment.number }}</td>
          <td>{{ payment.date }}</td>
          <td>{{ payment.category }}</td>
          <td>{{ payment.amount }}</td>

          <v-menu absolute offset-y :close-on-content-click="false">
            <template #activator="{ on }">
              <v-btn small icon @click="showContextMenu(payment)" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <ContextMenu
              v-if="showMenuForID === payment.id"
              :actions="contextActions"
              :item="{ ...payments[index] }"
            />
          </v-menu>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";
import formatDate from "../utils/formatDate.js";
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

  computed: {
    paymentsList() {
      const formatedPayments = this.payments.map((payment) => payment);
      formatedPayments.forEach((payment) => {
        payment.date = formatDate(new Date(payment.date));
      });
      return formatedPayments;
    },
  },

  methods: {
    showContextMenu(payment) {
      console.log("fired");
      this.$context.show(payment, this.paymentActions);
    },
  },

  mounted() {
    this.$context?.EventBus.$on("show", (data) => {
      console.log("show event catch");
      this.contextActions = data.actions;
      this.showMenuForID = data.item.id;
    });

    this.$context?.EventBus.$on("hide", () => {
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

.v-btn
  margin-top: 10px
</style>
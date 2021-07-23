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
          <v-btn small icon @click="showContextMenu(payment, $event)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-menu
            :close-on-click="false"
            :close-on-content-click="false"
            content-class="elevation-1"
            v-model="displayMenu"
            :position-x="x"
            :position-y="y"
          >
            <!-- <template #activator="{ on }">
              <v-btn small icon @click="showContextMenu(payment)" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template> -->
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
      displayMenu: false,
      showMenuForID: null,
      contextActions: null,
      x: 0,
      y: 0,
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
    showContextMenu(payment, e) {
      this.x = e.clientX + 10;
      this.y = e.clientY;
      if (this.showMenuForID === payment.id && this.displayMenu) {
        this.displayMenu = false;
        return;
      }
      this.$context.show(payment, this.paymentActions);
    },
  },

  mounted() {
    this.$context?.EventBus.$on("show", (data) => {
      this.contextActions = data.actions;
      this.showMenuForID = data.item.id;
      this.displayMenu = true;
    });

    this.$context?.EventBus.$on("hide", () => {
      this.displayMenu = false;
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
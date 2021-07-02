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
        <tr v-for="(payment, index) in payments" :key="index">
          <td>{{ payment.id }}</td>
          <td>{{ payment.date }}</td>
          <td>{{ payment.category }}</td>
          <td>{{ payment.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PaymentsList",
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
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
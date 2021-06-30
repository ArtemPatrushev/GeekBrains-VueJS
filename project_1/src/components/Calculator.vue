<template>
  <div class="container">
    <input type="number" v-model="operand" /> = {{ result }}
    <br />
    <button @click="accumulate('+')">+</button>
    <button @click="accumulate('-')">-</button>
    <button @click="accumulate('*')">*</button>
    <button @click="accumulate('/')">/</button>
    <button @click="accumulate('**')">**</button>
    <button @click="accumulate('//')">//</button>
    <button @click="calculate()">=</button>
    <button @click="reset()">C</button>
  </div>
</template>

<script>
export default {
  name: "Calculator",

  data() {
    return {
      operand: 0,
      accumulator: 0,
      operation: null,
      result: null,
    };
  },

  methods: {
    accumulate(calcOperation) {
      this.operation = calcOperation;
      this.accumulator =
        this.accumulator === 0 ? Number(this.operand) : this.accumulator;
      this.operand = "";
    },

    calculate() {
      this.operand = Number(this.operand);
      switch (this.operation) {
        case "+":
          this.accumulator += this.operand;
          break;
        case "-":
          this.accumulator -= this.operand;
          break;
        case "*":
          this.accumulator *= this.operand;
          break;
        case "/":
          this.accumulator /= this.operand;
          break;
        case "**":
          this.accumulator **= this.operand;
          break;
        case "//":
          this.accumulator = Math.floor(this.accumulator / this.operand);
          break;
      }
      this.result = this.accumulator;
      this.operand = "";
    },

    reset() {
      this.operand = 0;
      this.accumulator = 0;
      this.operation = null;
      this.result = null;
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="container">
    <div class="display">
      <input v-model.number="operand1" />
      <input v-model.number="operand2" />
      = {{ result }}
    </div>

    <div v-show="error">Ошибка! {{ error }}</div>

    <div class="keyboard">
      <button
        v-for="operand in operations"
        :key="operand"
        :disabled="operand1 === '' || operand2 === ''"
        @click="calculate(operand)"
      >
        {{ operand }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",

  data() {
    return {
      operations: ["+", "-", "/", "*", "//", "**"],
      operand1: 0,
      operand2: 0,
      result: 0,
      error: "",
    };
  },

  methods: {
    add() {
      this.result = this.operand1 + this.operand2;
    },
    substract() {
      this.result = this.operand1 - this.operand2;
    },
    divide() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "Делить на 0 нельзя";
      } else {
        this.result = operand1 / operand2;
      }
    },
    multiply() {
      this.result = this.operand1 * this.operand2;
    },

    intDivide() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "Делить на 0 нельзя";
      } else {
        this.result = Math.floor(operand1 / operand2);
      }
    },
    power() {
      this.result = this.operand1 ** this.operand2;
    },

    calculate(operation = "+") {
      this.error = "";
      switch (operation) {
        case "+":
          this.add();
          break;
        case "-":
          this.substract();
          break;
        case "*":
          this.multiply();
          break;
        case "/":
          this.divide();
          break;
        case "//":
          this.intDivide();
          break;
        case "**":
          this.power();
          break;
      }
    },
  },
};
</script>

<style>
</style>
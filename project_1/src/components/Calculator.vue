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

    <input type="checkbox" v-model="showKeyboard" /> Отобразить экранную
    клавиатуру

    <div v-show="showKeyboard">
      <button v-for="key in keyboard" :key="key" @click="writeNumber(key)">
        {{ key }}
      </button>
      <button @click="backSpace">←</button>
    </div>

    <div>
      <label for="operand1">
        Операнд 1
        <input
          type="radio"
          name="operand"
          id="operand1"
          value="first"
          v-model="currentOperand"
        />
      </label>
      <label for="operand2">
        Операнд 2
        <input
          type="radio"
          name="operand"
          id="operand2"
          value="second"
          v-model="currentOperand"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",

  data() {
    return {
      operations: ["+", "-", "/", "*", "//", "**"],
      keyboard: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      showKeyboard: false,
      operand1: 0,
      operand2: 0,
      currentOperand: "first",
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

    writeNumber(number) {
      const { currentOperand } = this;

      if (currentOperand === "first") {
        this.operand1 = +(String(this.operand1) + number);
      } else {
        this.operand2 = +(String(this.operand2) + number);
      }
    },

    backSpace() {
      const { currentOperand } = this;

      if (currentOperand === "first") {
        this.operand1 = +String(this.operand1).slice(0, -1);
      } else {
        this.operand2 = +String(this.operand2).slice(0, -1);
      }
    },
  },
};
</script>

<style>
</style>
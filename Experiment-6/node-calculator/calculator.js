// calculator.js
const readline = require("readline");

// Create input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=========================================");
console.log("         🧮 Node.js Calculator App       ");
console.log("=========================================");

function showMenu() {
  console.log("\nChoose an operation:");
  console.log("1. Addition (+)");
  console.log("2. Subtraction (-)");
  console.log("3. Multiplication (*)");
  console.log("4. Division (/)");
  console.log("5. Exit");

  rl.question("\nEnter your choice (1-5): ", (choice) => {
    if (choice === "5") {
      console.log("\n👋 Exiting calculator. Goodbye!");
      rl.close();
      return;
    }

    rl.question("Enter first number: ", (num1) => {
      rl.question("Enter second number: ", (num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        let result;

        switch (choice) {
          case "1":
            result = a + b;
            console.log(`\n✅ Result: ${a} + ${b} = ${result}`);
            break;
          case "2":
            result = a - b;
            console.log(`\n✅ Result: ${a} - ${b} = ${result}`);
            break;
          case "3":
            result = a * b;
            console.log(`\n✅ Result: ${a} * ${b} = ${result}`);
            break;
          case "4":
            if (b === 0) {
              console.log("\n❌ Error: Division by zero!");
            } else {
              result = a / b;
              console.log(`\n✅ Result: ${a} / ${b} = ${result}`);
            }
            break;
          default:
            console.log("\n⚠️ Invalid choice! Please enter 1–5.");
        }

        // Ask again after completing one operation
        showMenu();
      });
    });
  });
}

// Start calculator
showMenu();

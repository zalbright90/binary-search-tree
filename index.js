import { Tree } from './tree.js';

// Helper function to generate an array of random numbers < 100
function generateRandomNumbers(size) {
    const numbers = [];
    for (let i = 0; i < size; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }

    return numbers;
}

const randomNumbers = generateRandomNumbers(10);
const tree = new Tree(randomNumbers);

// Step 1: Confirm the tree is balanced
console.log("Is the tree balanced before unbalancing?", tree.isBalanced()); // Should print: true

// Step 2: Print out the elements in level, pre-order, post-order, and in-order
console.log("\nLevel Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("\nPre-order:");
tree.preOrder((node) => console.log(node.data));

console.log("\nPost-order:");
tree.postOrder((node) => console.log(node.data));

console.log("\nIn-order:");
tree.inOrder((node) => console.log(node.data));

// Step 3: Unbalance the tree by adding numbers greater than 100
tree.insert(200);
tree.insert(300);
tree.insert(400);
tree.insert(500);
tree.insert(600);

// Step 4: Confirm the tree is unbalanced
console.log("\nIs the tree balanced after unbalancing?", tree.isBalanced()); // Should print: false

// Step 5: Balance the tree by calling rebalance
tree.rebalance();

// Step 6: Confirm the tree is balanced after rebalancing
console.log("\nIs the tree balanced after rebalancing?", tree.isBalanced()); // Should print: true

// Step 7: Print out the elements in level, pre-order, post-order, and in-order again after rebalancing
console.log("\nLevel Order: ");
tree.levelOrder((node) => console.log(node.data));

console.log("\nPre-order: ");
tree.preOrder((node) => console.log(node.data));

console.log("\nPost-order: ");
tree.postOrder((node) => console.log(node.data));

console.log("\nIn-order: ");
tree.inOrder((node) => console.log(node.data));

tree.prettyPrint();
class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

// Build a tree class/factory to accept an array when initialized.
export class Tree {
    constructor(array) {
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    insert(value, root = this.root) {
        if (root === null) return new Node(value);

        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }
        return root;
    }

    deleteItem(value, root = this.root) {
        if (root === null) return root;

        if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            root.data = this.minValue(root.right);
            root.right = this.deleteItem(root.data, root.right);
        }
        return root;
    }

    minValue(root) {
        let current = root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    find(value, root = this.root) {
        if (root === null || root.data === value) {
            return root;
        }

        if (value < root.data) {
            return this.find(value, root.left);
        } else {
            return this.find(value, root.right);
        }
    }

    levelOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }

        const queue = [];
        if (this.root !== null) queue.push(this.root);

        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback(currentNode);

            if (currentNode.left !== null) queue.push(currentNode.left);
            if (currentNode.right !== null) queue.push(currentNode.right);
        }
    }

    inOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }

        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            callback(node); // Pass the entire node, not just node.data
            traverse(node.right);
        };

        traverse(this.root);
    }

    preOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }

        const traverse = (node) => {
            if (node === null) return;

            callback(node);
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);
    }

    postOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }

        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            callback(node);
        };

        traverse(this.root);
    }

    height(node) {
        if (node === null) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (node === null) return -1;

        let currentNode = this.root;
        let depthCount = 0;

        const findDepth = (node, currentDepth) => {
            if (node === null) return;

            if (node === currentNode) {
                depthCount = currentDepth;
                return;
            }

            if (currentNode.data < node.data) {
                findDepth(node.left, currentDepth + 1);
            } else if (currentNode.data > node.data) {
                findDepth(node.right, currentDepth + 1);
            }
        };

        findDepth(this.root, 0);
        return depthCount;
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) {
                return { isBalanced: true, height: -1 };
            }

            // Recursively check the left and right subtrees
            const left = checkBalance(node.left);
            const right = checkBalance(node.right);

            // If either subtree is unbalanced, return immediately
            if (!left.isBalanced || !right.isBalanced) {
                return { isBalanced: false, height: 0 }; // Return height as 0 when unbalanced
            }

            // Calculate the current node's height
            const height = Math.max(left.height, right.height) + 1;

            // Check if the current node is balanced (difference in heights is no more than 1)
            const isBalanced = Math.abs(left.height - right.height) <= 1;

            return { isBalanced, height };
        };

        return checkBalance(this.root).isBalanced;
    }

    rebalance() {
        const values = [];
        this.inOrder((node) => values.push(node.data));
        this.root = this.buildTree(values);
    }
}

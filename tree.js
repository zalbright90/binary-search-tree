class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

// Build a tree class/factory to accept an array when initialized.
class Tree {
    constructor(array) {
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    // Write a buildTree(array) function
    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    // Write insert(value) and deleteItem(value) functions that insert/delete the given value.
    insert(value, root = this.root) {
        if (root === null) return new Node(value);

        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }
        return root;
    }

    deleteItem (value, root = this.root) {
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

    // Write a find(value) function that returns the node with the given value.
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

        const traverse = (queue) => {
            if (queue.length === 0) return;

            const currentNode = queue.shift();
            callback(currentNode);

            if (currentNode.left !== null) queue.push(currentNode.left);
            if (currentNode.right !== null) queue.push(currentNode.right);

            traverse(queue);
        };

        if (this.root !== null) traverse([this.root]);
    }

    inOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }

        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
            
        };

        traverse(this.root);
    }

    preOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }

        const traverse = (node) => {
            if (node === null)  return;

            callback(node.data);
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
            callback(node.data);
        };

        traverse(this.root);
    }
};

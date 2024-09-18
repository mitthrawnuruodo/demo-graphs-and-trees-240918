// Node class representing each node in the BST
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
  
// Binary Search Tree class
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST
  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      // Tree is empty, set root to new node
      this.root = newNode;
      return this;
    } else {
      let current = this.root;

      while (true) {
        if (value === current.value) {
          // Duplicate values are not inserted
          return undefined;
        }
        if (value < current.value) {
          // Go left
          if (current.left === null) {
            current.left = newNode;
            return this;
          }
          current = current.left;
        } else {
          // Go right
          if (current.right === null) {
            current.right = newNode;
            return this;
          }
          current = current.right;
        }
      }
    }
  }

  // Search for a value in the BST
  search(value) {
    if (this.root === null) return false;

    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        // Value found
        return true;
      }
      if (value < current.value) {
        // Go left
        current = current.left;
      } else {
        // Go right
        current = current.right;
      }
    }
    // Value not found
    return false;
  }

  // Remove a value from the BST
  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  // Helper method for remove
  _removeNode(node, value) {
    if (node === null) {
      // Value not found in tree
      return null;
    }

    if (value < node.value) {
      // Go left
      node.left = this._removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      // Go right
      node.right = this._removeNode(node.right, value);
      return node;
    } else {
      // Node with the value found

      // Case 1: No child
      if (node.left === null && node.right === null) {
        return null;
      }

      // Case 2: One child (right)
      if (node.left === null) {
        return node.right;
      }

      // Case 2: One child (left)
      if (node.right === null) {
        return node.left;
      }

      // Case 3: Two children
      // Find the in-order successor (smallest in the right subtree)
      let tempNode = this._findMinNode(node.right);
      node.value = tempNode.value;
      node.right = this._removeNode(node.right, tempNode.value);
      return node;
    }
  }

  // Helper method to find the minimum node
  _findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Optional: Method to print the tree (in-order traversal)
  inOrderTraversal(node = this.root, visitFn = console.log) {
    if (node !== null) {
      this.inOrderTraversal(node.left, visitFn);
      visitFn(node.value);
      this.inOrderTraversal(node.right, visitFn);
    }
  }
}

// Create a new BST instance
console.log("Create a new BST instance");
const bst = new BinarySearchTree();

// Insert values into the BST
bst.insert(15);
bst.insert(10);
bst.insert(20);
bst.insert(8);
bst.insert(12);
bst.insert(17);
bst.insert(25);

// Search for values
console.log(bst.search(10)); // Output: true
console.log(bst.search(99)); // Output: false

// In-order traversal to print sorted values
console.log("In-order traversal before deletion:");
bst.inOrderTraversal(); // Output: 8, 10, 12, 15, 17, 20, 25

// Remove a value
bst.remove(20);

// Check if the value is removed
console.log(bst.search(20)); // Output: false

// In-order traversal to print sorted values
console.log("In-order traversal after deletion:");
bst.inOrderTraversal(); // Output: 8, 10, 12, 15, 17, 25
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
  
    // Add a new vertex (node) to the graph
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
  
    // Add an edge (connection) between two vertices
    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1]) {
            this.adjacencyList[vertex1].push(vertex2);
        }
        if (this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex2].push(vertex1); // Assuming it's an undirected graph
        }
    }
  
    // Print the adjacency list (for debugging)
    display() {
      for (let vertex in this.adjacencyList) {
        console.log(vertex, "->", this.adjacencyList[vertex].join(", "));
      }
    }

    // Depth-First Search (DFS) - Recursive
    depthFirstSearch(start, visited = {}) {
        // Mark the current vertex as visited
        visited[start] = true;
        console.log(start);

        // Recursively visit all unvisited neighbors
        this.adjacencyList[start].forEach(neighbor => {
            if (!visited[neighbor]) {
                this.depthFirstSearch(neighbor, visited);
            }
        });
    }

    // Breadth-First Search (BFS)
    breadthFirstSearch(start) {
        const queue = [start]; // Initialize the queue with the starting node
        const visited = {};    // Track visited nodes
        visited[start] = true;

        while (queue.length > 0) {
        const vertex = queue.shift(); // Dequeue the first vertex
        console.log(vertex);

        // Enqueue all unvisited neighbors
        this.adjacencyList[vertex].forEach(neighbor => {
            if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
            }
        });
        }
    }
}
  
// Example usage:
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("B", "E");
graph.addEdge("C", "F");

graph.display();

console.log("DFS Traversal:");
graph.depthFirstSearch("A");

console.log("BFS Traversal:");
graph.breadthFirstSearch("A");
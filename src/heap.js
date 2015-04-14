// Heap implementation ported from Golang to JavaScript packaged for npm.
//
// Original code available at http://golang.org/src/container/heap/heap.go.
// API documentation is at http://golang.org/pkg/container/heap/.
//
// Differences of ported code from original:
// - syntax changed from Go to JavaScript;
// - naming conventions changed to more accustomed for JavaScript;
// - integer division emulated with truncation;
// - code prepared to be used as npm package.
//
// This code retains copyright restrictions of the original code.
//
// Original code is governed by BSD license (see http://golang.org/LICENSE,
// also can be found in the LICENSE file in the project's directory).

// Module provides heap operations for object, passed into module's methods.
// Object should implement such methods:
//  push(x) - add x as element len()
//  pop() - remove and return element len() - 1
//  len() - return number of elements in the collection
//  less(i, j) - reports whether element with index i should sort before the element with index j
//  swap(i, j) - swaps the elements with index i and j
//
// See original documentation for details: http://golang.org/pkg/container/heap/.
module.exports = {

    // A heap must be initialized before any of the heap operations
    // can be used. init() is idempotent with respect to the heap invariants
    // and may be called whenever the heap invariants may have been invalidated.
    // Its complexity is O(n) where n = h.len().
    init: (h) => {
        // heapify
        for (let n = h.len(), i = Math.trunc(n / 2) - 1; i >= 0; --i) {
            down(h, i, n);
        }
    },

    // push() pushes the element x onto the heap. The complexity is
    // O(log(n)) where n = h.len().
    push: (h, x) => {
        h.push(x);
        up(h, h.len() - 1);
    },

    // pop() removes the minimum element (according to less()) from the heap
    // and returns it. The complexity is O(log(n)) where n = h.len().
    // It is equivalent to remove(h, 0).
    pop: (h) => {
        let n = h.len() - 1;
        h.swap(0, n);
        down(h, 0, n);
        return h.pop();
    },

    // remove() removes the element at index i from the heap.
    // The complexity is O(log(n)) where n = h.len().
    remove: (h, i) => {
        let n = h.len() - 1;
        if (n != i) {
            h.swap(i, n);
            down(h, i, n);
            up(h, i);
        }
        return h.pop();
    },

    // fix() re-establishes the heap ordering after the element at index i has changed its value.
    // Changing the value of the element at index i and then calling fix() is equivalent to,
    // but less expensive than, calling remove(h, i) followed by a push() of the new value.
    // The complexity is O(log(n)) where n = h.len().
    fix: (h, i) => {
        down(h, i, h.len());
        up(h, i);
    }
};

function up(h, j) {
    for (;;) {
        let i = Math.trunc((j - 1) / 2); // parent
        if (i == j || !h.less(j, i)) {
            break;
        }
        h.swap(i, j);
        j = i;
    }
}

function down(h, i, n) {
    for (;;) {
        let j1 = 2 * i + 1;
        if (j1 >= n || j1 < 0) { // j1 < 0 after int overflow
            break;
        }
        let j = j1, // left child
            j2 = j1 + 1;
        if (j2 < n && !h.less(j1, j2)) {
            j = j2; // = 2*i + 2  // right child
        }
        if (!h.less(j, i)) {
            break;
        }
        h.swap(i, j);
        i = j;
    }
}

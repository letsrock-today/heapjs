# heapjs

Heap implementation ported from Golang to JavaScript packaged for npm.

Original code available at http://golang.org/src/container/heap/heap.go.
API documentation is at http://golang.org/pkg/container/heap/.

Differences of ported code from original:
- syntax changed from Go to JavaScript;
- naming conventions changed to more accustomed for JavaScript;
- integer division emulated with truncation;
- code prepared to be used as npm package.

This code retains copyright restrictions of the original code.

Original code is governed by BSD license (see http://golang.org/LICENSE,
also can be found in the LICENSE file in the project's directory).

## Motivation

With abundance of heap and priority queue implementations on the www.npmjs.com
I didn't find any library wich can be used with arbitrary underlying collection
without copying all elements to the heap's internal fields.

Meanwhile, Go's heap provides very neat approach: you can use any existing
data collection and wrap it with interface required by the heap, after that
you can work with collection via heap's interface or directly - you'll just
need to call heap.fix() if you changed collection directly.

I used this module to create cache on top of the HTML5 localStorage.
Cache needs some way to evict expired elements and my implementation uses heap
to accumplish this. Items in cache are ordered by priority and new item evicts
existing item with the lowest priority. With this implementation of heap
I don't need to load/save all the cache's data from/to the localStorage into/from
the JavaScript's memory on every operation to keep structure ordered
as I would need with other libs. All the data is kept ordered in place with
access only to several localStorage's items during access to the one cache element.

## Installation

    npm i -g heapjs

## Usage

	var heap = require('heapjs'),
		h = {
			a: [],
			less: function(i, j) {
				return this.a[i] < this.a[j];
			}
			swap: function(i, j) {
				var t = this.a[i];
				this.a[i] = this.a[j];
				this.a[j] = t;
			}
			len: function() {
				return this.a.length;
			}
			pop: function() {
				return this.a.pop();
			}
			push: function (v) {
				this.a.push(v);
			}
		};

	for (var i = 20; i > 0; --i) {
		h.push(i);
	}
	heap.init(h);
	// from now on you have a heap
	// heap.pop() will return elements in order defined by less() function
	for (var i = 1; h.len() > 0; ++i) {
		var x = heap.pop(h);
		x.should.be.equal(i);
	}

- See tests at https://github.com/letsrock-today/heapjs/test/heap.js.
- See comments to source code at https://github.com/letsrock-today/heapjs/src/heap.js.
- See API documentation of original code at http://golang.org/pkg/container/heap/.

## Tests

    npm install
    npm test


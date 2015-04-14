import chai from 'chai';
import heap from '../src/heap';

let should = chai.should();

class MyHeap {
    constructor() {
        this.h = [];
    }

    less(i, j) {
        return this.h[i] < this.h[j];
    }

    swap(i, j) {
        let t = this.h[i];
        this.h[i] = this.h[j];
        this.h[j] = t;
    }

    len() {
        return this.h.length;
    }

    pop() {
        return this.h.pop();
    }

    push(v) {
        this.h.push(v);
    }

    verify(i) {
        let n = this.h.length,
            j1 = 2 * i + 1,
            j2 = 2 * i + 2;
        if (j1 < n) {
            this.less(j1, i).should.be.false;
            this.verify(j1);
        }
        if (j2 < n) {
            this.less(j2, i).should.be.false;
            this.verify(j2);
        }
    }
};

describe('# heap', () => {

    let h;

    beforeEach(() => {
        h = new MyHeap();
    });

    it('init with 0', () => {
        for (let i = 20; i > 0; --i) {
            h.push(0);
        }
        heap.init(h);
        h.verify(0);
        for (let i = 1; h.len() > 0; ++i) {
            let x = heap.pop(h);
            h.verify(0);
            x.should.be.equal(0);
        }
    });

    it('init with different integers', () => {
        for (let i = 20; i > 0; --i) {
            h.push(i);
        }
        heap.init(h);
        h.verify(0);
        for (let i = 1; h.len() > 0; ++i) {
            let x = heap.pop(h);
            h.verify(0);
            x.should.be.equal(i);
        }

    });

    it('push & pop', () => {
        h.verify(0);
        for (let i = 20; i > 10; --i) {
            h.push(i);
        }
        heap.init(h);
        h.verify(0);
        for (let i = 10; i > 0; --i) {
            heap.push(h, i);
            h.verify(0);
        }
        for (let i = 1; h.len() > 0; ++i) {
            let x = heap.pop(h);
            if (i < 20) {
                heap.push(h, 20 + i);
            }
            h.verify(0);
            x.should.be.equal(i);
        }
    });

    it('remove #0', () => {
        for (let i = 0; i < 10; ++i) {
            h.push(i);
        }
        h.verify(0);
        while (h.len() > 0) {
            let i = h.len() - 1;
            let x = heap.remove(h, i);
            x.should.be.equal(i);
            h.verify(0);
        }
    });

    it('remove #1', () => {
        for (let i = 0; i < 10; ++i) {
            h.push(i);
        }
        h.verify(0);
        for (let i = 0; h.len() > 0; ++i) {
            let x = heap.remove(h, 0);
            x.should.be.equal(i);
            h.verify(0);
        }
    });

    it('remove #2', () => {
        let N = 10;
        for (let i = 0; i < N; ++i) {
            h.push(i);
        }
        h.verify(0);
        let m = new Set();
        while (h.len() > 0) {
            m.add(heap.remove(h, Math.trunc((h.len() - 1) / 2)));
            h.verify(0);
        }
        m.size.should.be.equal(N);
        for (let i = 0; i < m.size; ++i) {
            m.has(i).should.be.true;
        }
    });

    it('fix', () => {
        h.verify(0);
        for (let i = 200; i > 0; i -= 10) {
            heap.push(h, i);
        }
        h.verify(0);
        h.h[0].should.be.equal(10);
        h.h[0] = 210;
        heap.fix(h, 0);
        h.verify(0);
        for (let i = 100; i > 0; --i) {
            let elem = Math.trunc(Math.random() * h.len());
            if (i & 1 == 0) {
                h.h[elem] *= 2;
            } else {
                h.h[elem] = Math.trunc(h.h[elem] / 2);
            }
            heap.fix(h, elem);
            h.verify(0);
        }
    });
});

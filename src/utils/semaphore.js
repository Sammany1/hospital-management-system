class Semaphore {
  constructor(max) {
    this.max = max;
    this.counter = 0;
    this.queue = [];
  }

  async acquire() {
    if (this.counter < this.max) {
      this.counter++;
      return;
    }
    return new Promise(resolve => this.queue.push(resolve));
  }

  release() {
    this.counter--;
    if (this.queue.length > 0) {
      this.counter++;
      const resolve = this.queue.shift();
      resolve();
    }
  }
}

export default Semaphore;

/**
 * Subscriber pattern implementation.
 */
class SizeSubscriber {
  observers = [];
  width = 0;
  height = 0;

  subscribe(observer) {
    if (typeof observer !== 'function') {
      throw new Error('Expected function as an argument.');
    }

    this.observers.push(observer);
    observer(this.width, this.height);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(element => element !== observer);
  }

  update(width, height) {
    if (this.width === width && this.height === height) return;

    this.width = width;
    this.height = height;
    this.observers.forEach(observer => observer(width, height));
  }
}

export default SizeSubscriber;

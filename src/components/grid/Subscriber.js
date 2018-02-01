
/**
 * Subscriber pattern implementation.
 */
class SizeSubscriber {
  observers = [];
  width = 0;
  height = 0;

  /**
   * Add an observer which will be notified on size changes.
   *
   * @param {function(number, number): void} observer
   */
  subscribe(observer) {
    if (typeof observer !== 'function') {
      throw new Error('Expected function as an argument.');
    }

    this.observers.push(observer);
    observer(this.width, this.height);
  }

  /**
   * Remove previously added observer from list of observers.
   *
   * @param {function(number, number): void} observer
   */
  unsubscribe(observer) {
    this.observers = this.observers.filter(element => element !== observer);
  }

  /**
   * Update all observers of change in size.
   *
   * @param {number} width
   * @param {number} height
   */
  update(width, height) {
    if (this.width === width && this.height === height) return;

    this.width = width;
    this.height = height;
    this.observers.forEach(observer => observer(width, height));
  }
}

export default SizeSubscriber;

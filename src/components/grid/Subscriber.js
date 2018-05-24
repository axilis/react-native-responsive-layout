
/**
 * Subscriber pattern implementation.
 */
class SizeSubscriber {
  observers = [];
  width = 0;
  height = 0;
  name = "";

  constructor(name) {
    this.name = name;
  }

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
    console.log(this.name, "New subscription; ", this.observers.length);
    observer(this.width, this.height);
  }

  /**
   * Remove previously added observer from list of observers.
   *
   * @param {function(number, number): void} observer
   */
  unsubscribe(observer) {
    console.log(this.name, "New unsubscription; ", this.observers.length);
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

    if (this.observers.length)
      console.log(this.name, "CALLING OBSERVERS", this.width, width, this.height, height);

    this.width = width;
    this.height = height;
    this.observers.forEach(observer => observer(width, height));
  }
}

export default SizeSubscriber;

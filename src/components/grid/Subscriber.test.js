import SizeSubscriber from './Subscriber';


describe('SizeSubscriber', () => {
  describe('subscribe', () => {
    it('expects subscription of functions', () => {
      const subscriber = new SizeSubscriber();
      expect(() => { subscriber.subscribe(); }).toThrow();
    });

    it('calls observer with with defaults upon subscription', () => {
      const observer = jest.fn();
      const subscriber = new SizeSubscriber();
      subscriber.subscribe(observer);

      expect(observer.mock.calls[0][0]).toBe(0);
      expect(observer.mock.calls[0][1]).toBe(0);
    });

    it('calls observer with current values upon subscription', () => {
      const observer = jest.fn();
      const subscriber = new SizeSubscriber();
      subscriber.update(100, 200);
      subscriber.subscribe(observer);

      expect(observer.mock.calls[0][0]).toBe(100);
      expect(observer.mock.calls[0][1]).toBe(200);
    });
  });

  describe('unsubscribe', () => {
    it('doesn\'t call function when they unsubscribe', () => {
      const observer = jest.fn();
      const subscriber = new SizeSubscriber();
      subscriber.subscribe(observer);
      subscriber.unsubscribe(observer);
      subscriber.update(100, 200);

      // Only invoked once upon subscription.
      expect(observer.mock.calls.length).toBe(1);
    });
  });

  describe('update', () => {
    it('is invoked when either value changes', () => {
      const observer = jest.fn();
      const subscriber = new SizeSubscriber();
      subscriber.subscribe(observer);
      subscriber.update(100, 0);

      expect(observer.mock.calls[1][0]).toBe(100);
      expect(observer.mock.calls[1][1]).toBe(0);

      subscriber.update(100, 200);
      expect(observer.mock.calls[2][0]).toBe(100);
      expect(observer.mock.calls[2][1]).toBe(200);
    });
  });

  it('is not invoked when neither value changes', () => {
    const observer = jest.fn();
    const subscriber = new SizeSubscriber();
    subscriber.subscribe(observer);
    subscriber.update(100, 100);

    expect(observer.mock.calls[1][0]).toBe(100);
    expect(observer.mock.calls[1][1]).toBe(100);

    subscriber.update(100, 100);
    expect(observer.mock.calls.length).toBe(2);
  });
});

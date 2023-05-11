module.exports = class Event {
  constructor(client) {
    this.client = client;
  }

  run(/* Add event-specific parameters */) {
    throw new Error(
      `The run() method is not implemented for the ${this.constructor.name} event.`
    );
  }
};

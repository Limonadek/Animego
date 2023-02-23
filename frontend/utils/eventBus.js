class EventBus {

    listeners = {};

    on(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = new Set();
        }

        this.listeners[eventName].add(callback);
    }

    off(eventName, callback) {
        if (!this.listeners[eventName]) {
            return;
        }

        const newListeners = this.listeners[listeners]
            .filter(listener => listener !== callback);

        this.listeners[eventName] = newListeners; 
    }

    emit(eventName, data) {
        if (!this.listeners[eventName]) {
            return;
        }

        this.listeners[eventName].forEach((listener) => {
            listener(data);
        });
    }
}

export default new EventBus();


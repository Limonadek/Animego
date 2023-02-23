import template from './loader.handlebars';

export class Loader {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const html = template();
        this.parent.innerHTML += html;
    }
}

import { Loader } from '../loader/loader.js';
import EventBus from "../../utils/eventBus.js";
import template from './pageContent.handlebars';

export class PageContent {
    constructor(parent, container) {
        this.parent = parent;
        this.container = container;

        EventBus.on('animeContents:loading', this.render.bind(this));
        EventBus.on('animeContents:got-by-id-info', this.update.bind(this));
    }

    render(data) {
        if (!data) {
            this.container.innerHTML = '';
            const loader = new Loader(this.container);
            loader.render();
            this.parent.append(this.container);
            return;
        }

        console.log(data.urlWatch);

        const html = template(data);
        this.container.innerHTML += html;


    }

    update(data = {}) {
        if (!data || !Object.keys(data)) {
            return;
        }
        this.container.innerHTML = '';
        this.render(data);
    }
}
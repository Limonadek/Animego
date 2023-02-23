import { Loader } from '../loader/loader.js';
import EventBus from "../../utils/eventBus.js";
import template from './content.handlebars';

export class Content {
    constructor(parent, container) {
        this.parent = parent;
        this.container = container;

        const contentsPost = document.createElement('div');
        contentsPost.classList.add('contents-container');
        this.contentsPost = contentsPost;

        EventBus.on('animeContents:loading', this.render.bind(this));
    }

    render(data) {
        if (!data || !data.length) {
            this.contentsPost.innerHTML = '';
            const loader = new Loader(this.contentsPost);
            loader.render();
            this.parent.append(this.contentsPost);
            return;
        }

        data.forEach(element => {

            const html = template(element);
            this.contentsPost.innerHTML += html;

        });
            
    }

    update(data) {
        this.contentsPost.innerHTML = '';
        this.render(data);
    }
}


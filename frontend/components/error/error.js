import template from './error.handlebars';

export class Error {
    constructor(parent) {
        this.parent = parent;
    }

    render({title, description}) {
        if (!title || !description) {
            return;
        }
        
        try {
            const context = {title, description};
            const html = template(context);
            this.parent.innerHTML += html
            
        } catch(error) {
            return;
        }

    }

}

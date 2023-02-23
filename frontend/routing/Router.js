import {AnimeCotroller} from '../controller/animeController.js';
import {AnimePage} from '../controller/animePage.js';
import EventBus from '../utils/eventBus.js';


const routes = [
    {
        path: `\^/\$`,
        controller: AnimeCotroller,
        id: false
    },
    {
        path: `/anime/\\d`,
        controller: AnimePage,
        id: true
    },
]


export class Router {
    constructor() {
        EventBus.off('animeContents:loading');
        EventBus.off('animeContents:error');
        EventBus.off('animeContents:got-by-id-info');
        EventBus.off('animeContents:got-info');
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }

    onDocumentClick(event) {
        const {target} = event;
        const {tagName} = target;

        if (tagName === 'A') {
            event.preventDefault();

            if (target.href !== undefined && target.target != '_blank') {
                this.go(target.href);

            } else {
                window.open(target.href);
            }
        }
    }

    go(pathname) {
        window.history.pushState({}, '', pathname);
        this.invokeController();
    }

    invokeController() {
        const pathname = window.location.pathname;

        const result = routes.find((route) => {
            const regexp = new RegExp(route.path);
            const matches = pathname.match(regexp);
            return Boolean(matches); 
        });

        if (!result) {
            return;
        }

        const ControllerClass = result.controller;
        const controller = new ControllerClass();

        if (!result.id) {
            controller.process();
        } else {
            const rex = /\w+$/;
            controller.process(pathname.match(rex)[0])
        }
    }


    start() {
        document.addEventListener('click', this.onDocumentClick);
        window.addEventListener('popstate', this.invokeController);
        this.invokeController();
    }

    stop() {
        document.removeEventListener('click', this.onDocumentClick);
        window.removeEventListener('popstate', this.invokeController);
    }

}

export const router = new Router();
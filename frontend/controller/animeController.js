import {MainView} from '../view/mainView.js';
import {AnimeContents} from '../model/animeContents.js';
import EventBus from '../utils/eventBus.js';


export class AnimeCotroller {
    async process() {
        const view = new MainView();
        view.render();

        const animeContents = new AnimeContents({});
        EventBus.emit('animeContents:loading');
        animeContents.fetchData();

    }
}


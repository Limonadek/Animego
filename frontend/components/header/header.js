const URL_MAIN = 'http://87.239.109.131';
const URL_ANIME = 'https://animego.org/anime';
const URL_MANGA = 'https://animego.org/manga';
const URL_PERSONS = 'https://animego.org/characters';
const URL_LOGIN = 'https://animego.org/login';
import URL_LOGO from './logo.png'; 

import template from './header.handlebars';

export class Header {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const context = {URL_MAIN, URL_LOGO, URL_ANIME, URL_MANGA, URL_PERSONS, URL_LOGIN};
        const html = template(context);

        this.parent.innerHTML += html;
    }
}


export default class Player {
    constructor (id, name, gamesCount, rating, win, los, wr, games) {
        this.id = id;
        this.name = name;
        this.gamesCount = gamesCount;
        this.rating = rating;
        this.win = win;
        this.los = los;
        this.wr = wr;
        this.games = games;
    }
};
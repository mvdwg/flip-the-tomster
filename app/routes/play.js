import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  game: service(),

  preferences: service(),

  beforeModel() {
    let audio = this.get('audio');
    audio.play('MUSIC', audio.gameMusicTrack, 0.2, true);
  },

  model() {
    return this.get('game').create({
      size: this.get('preferences.size'),
      figure: this.get('preferences.figure')
    });
  },

  actions: {
    willTransition() {
      this.get('game').reset();
    }
  }
});

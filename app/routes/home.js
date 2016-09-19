import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  audio: service(),

  beforeModel() {
    let audio = this.get('audio');

    if (audio.currentMusicTrack !== audio.menuMusicTrack) {
      audio.play('MUSIC', audio.menuMusicTrack, 0.8, true);
    }
  }
});

import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  audio: service(),

  beforeModel() {
    let audio = this.get('audio');

    if (!audio.get('isMusicPlaying') || audio.get('currentMusicTrack') !== audio.get('menuMusicTrack')) {
      audio.playMusic(audio.menuMusicTrack, true);
    }
  }
});

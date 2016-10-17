import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    let audio = this.get('audio');

    if (!audio.get('isMusicPlaying') || audio.get('currentMusicTrack') !== audio.get('menuMusicTrack')) {
      audio.playMusic(audio.menuMusicTrack, true);
    }
  }
});

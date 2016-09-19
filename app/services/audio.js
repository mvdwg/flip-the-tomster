import Ember from 'ember';

const { Service } = Ember;

export default Service.extend({
  music: null,

  fx: null,

  isMusicPlaying: false,

  isFxPlaying: false,

  currentMusicTrack: null,

  currentFxTrack: null,

  menuMusicTrack: '/audio/music/bensound-jazzyfrenchy.mp3',

  gameMusicTrack: '/audio/music/bensound-countryboy.mp3',

  fxFlipCard: '/audio/fx/card-flip.mp3',

  fxCardCorrect: '/audio/fx/card-correct.mp3',

  fxCardIncorrect: '/audio/fx/card-incorrect.mp3',

  play(type, track, volume = 0.8, loop = false) {
    let player = null;

    if (type === 'MUSIC') {
      player = this.get('music');

      this.setProperties({
        currentMusicTrack: track,
        isMusicPlaying: true
      });
    } else {
      player = this.get('fx');

      this.setProperties({
        currentFxTrack: track,
        isFxPlaying: true
      });
    }

    player.src = track;
    player.volume = volume;
    player.loop = loop;
    player.play();
  },

  stop(type) {
    let player = this.get('fx');

    if (type === 'MUSIC') {
      player = this.get('music');
      this.setProperties({
        currentMusicTrack: null,
        isMusicPlaying: false
      });
    } else {
      player = this.get('fx');
      this.setProperties({
        currentFxTrack: null,
        isFxPlaying: false
      });
    }

    player.pause();
    player.currentTime = 0;
  },

  init() {
    this._super(...arguments);

    this.setProperties({
      music: new Audio(),
      fx: new Audio()
    });

    this.get('music').addEventListener('pause', () => {
      Ember.run(() => {
        this.set('isMusicPlaying', false);
      });
    });

    this.get('fx').addEventListener('pause', () => {
      Ember.run(() => {
        this.set('isFxPlaying', false);
      });
    });
  }
});

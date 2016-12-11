import Ember from 'ember';

const { Service, computed, inject: { service }, observer, isNone } = Ember;

export default Service.extend({
  preferences: service(),

  musicOn: computed.alias('preferences.music'),
  musicVolume: computed.alias('preferences.musicVolume'),
  musicPlayer: null,
  isMusicPlaying: false,
  currentMusicTrack: null,

  fxOn: computed.alias('preferences.effects'),
  fxVolume: computed.alias('preferences.effectsVolume'),

  menuMusicTrack: '/audio/music/bensound-jazzyfrenchy.mp3',
  gameMusicTrack: '/audio/music/bensound-countryboy.mp3',
  fxFlipCard: '/audio/fx/card-flip.mp3',
  fxCardCorrect: '/audio/fx/card-correct.mp3',

  musicOnDidChange: observer('musicOn', function() {
    if (this.get('musicOn')) {
      this.playMusic(this.get('menuMusicTrack'), true);
    } else {
      this.stopMusic();
    }
  }),

  musicVolumeDidChange: observer('musicVolume', function() {
    if (this.get('musicOn') && this.get('isMusicPlaying')) {
      Ember.set(this, 'musicPlayer.volume', this.get('musicVolume'));
    }
  }),

  playMusic(track, loop = false) {
    if (!this.get('musicOn') ||
      this.get('isMusicPlaying') && this.get('currentMusicTrack') === track) {
      return;
    }

    let player = this.get('musicPlayer');

    this.setProperties({
      currentMusicTrack: track,
      isMusicPlaying: true
    });

    player.src = track;
    player.volume = this.get('musicVolume');
    player.loop = loop;
    player.play();
  },

  playFx(track) {
    if (!this.get('fxOn')) {
      return;
    }

    let player = new Audio();

    player.src = track;
    player.volume = this.get('fxVolume');
    player.loop = false;
    player.play();
  },

  stopMusic() {
    let player = this.get('musicPlayer');

    this.setProperties({
      currentMusicTrack: null,
      isMusicPlaying: false
    });

    player.pause();
    player.currentTime = 0;
  },

  init() {
    this._super(...arguments);

    if (isNone(this.get('musicVolume'))) {
      this.set('musicVolume', 0.8);
    }

    if (isNone(this.get('fxVolume'))) {
      this.set('fxVolume', 0.6);
    }

    this.set('musicPlayer', new Audio());

    this.get('musicPlayer').addEventListener('pause', () => {
      Ember.run(() => {
        this.stopMusic();
      });
    });
  }
});

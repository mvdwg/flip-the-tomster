import Ember from 'ember';

import preference from 'ember-preferences/computed';

const { get, $ } = Ember;

export default Ember.Route.extend({
  size: preference('size'),

  figure: preference('figure'),

  music: preference('music'),

  effects: preference('effects'),

  musicVolume: preference('musicVolume'),

  effectsVolume: preference('effectsVolume'),

  beforeModel() {
    let audio = this.get('audio');

    if (!audio.get('isMusicPlaying') || audio.get('currentMusicTrack') !== audio.get('menuMusicTrack')) {
      audio.play('MUSIC', audio.menuMusicTrack, 0.8, true);
    }
  },

  model() {
    return {
      figures: [
        {
          label: 'Tomster',
          image: '/images/tomster14.png',
          value: 'tomster'
        },
        {
          label: 'Dog',
          image: '/images/dog13.png',
          value: 'dog'
        },
      ],
      sizes: [
        {
          label: '4 x 4',
          value: 16
        },
        {
          label: '6 x 6',
          value: 36
        },
        {
          label: '8 x 8',
          value: 64
        }
      ],
      music: this.get('music'),
      effects: this.get('effects'),
      musicVolume: this.get('musicVolume'),
      effectsVolume: this.get('effectsVolume')
    };
  },

  actions: {
    setFigure(option) {
      this.set('figure', option.value);
    },

    setSize(option) {
      this.set('size', option.value);
    },

    setMusic(event) {
      let element = get(event, 'target');
      let checked = $(element).is(':checked');

      this.set('music', checked);
    },

    setEffects(event) {
      let element = get(event, 'target');
      let checked = $(element).is(':checked');

      this.set('effects', checked);
    },

    setVolume(type, volume) {
      console.log('SET VOLUME', type, volume);
    }
  }
});

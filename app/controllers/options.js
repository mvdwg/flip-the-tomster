import Ember from 'ember';
import preference from 'ember-preferences/computed';

const { get, $ } = Ember;

export default Ember.Controller.extend({
  size: preference('size'),
  figure: preference('figure'),
  music: preference('music'),
  effects: preference('effects'),
  musicVolume: preference('musicVolume'),
  effectsVolume: preference('effectsVolume'),

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

    setMusicVolume() {
      let currentVolume = this.controller.get('model.musicVolume');
      this.set('musicVolume', parseFloat(currentVolume));
    },

    setEffects(event) {
      let element = get(event, 'target');
      let checked = $(element).is(':checked');

      this.set('effects', checked);
    },

    setEffectsVolume() {
      let currentVolume = this.controller.get('model.effectsVolume');
      this.set('effectsVolume', parseFloat(currentVolume));
    }
  }
});

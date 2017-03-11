import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  audio: service(),

  beforeModel() {
    this.get('audio').playMusic(this.get('audio.menuMusicTrack'), true);
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
      ]
    };
  }
});

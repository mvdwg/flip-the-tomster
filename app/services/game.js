import Ember from 'ember';
import randomize from 'flip-the-tomster/utils/shuffle';
import range from 'flip-the-tomster/utils/range';
import Card from 'flip-the-tomster/models/card';
import ENV from 'flip-the-tomster/config/environment';

export default Ember.Service.extend({
  shuffle: randomize,
  previousCard: null,
  scheduledAnimation: null,

  create({size = 16, figure = 'tomster'} = {size: 16, figure: 'tomster'}) {
    return Ember.Object.create({
      cards: this.generateCards(size, figure),
      figure: figure
    });
  },

  generateCards(amount, figure) {
    let numberOfValues = amount / 2;
    let values = this.pickRandomValues(numberOfValues, figure);
    let cards = Card.generate(values);

    return this.shuffle(cards);
  },

  pickRandomValues(amount, figure) {
    let numberOfFigures = ENV.figures[figure];

    return this.shuffle(range(1, numberOfFigures)).slice(0, amount);
  },

  reset() {
    this.set('previousCard', null);
    let animation = this.get('scheduledAnimation');
    if(animation) {
      Ember.run.cancel(animation);
    }
  },

  flip(card) {
    // current card already flipped -> do nothing
    if(card.get('isFlipped')) {
      return false;
    }

    // previous card null -> flip current card
    if(this.get('previousCard') === null) {
      card.set('isFlipped', true);
      this.set('previousCard', card);
      return false;
    }

    // previous card and current card equals -> flip current
    if(this.get('previousCard.value') === card.get('value')) {
      card.set('isFlipped', true);
      this.set('previousCard', null);
      return false;
    }

    // previous card and current card different -> flip previous and show current
    if(this.get('previousCard.value') !== card.get('value')) {
      card.set('isFlipped', true);

      let previous = this.get('previousCard');
      let current = card;

      let animation = Ember.run.later(() => {
        Ember.set(current, 'isFlipped', false);
        Ember.set(previous, 'isFlipped', false);
      }, 800);

      this.set('scheduledAnimation', animation);
      this.set('previousCard', null);

      return false;
    }
  }
});

import {
  create,
  visitable,
  collection
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  unselectedCards: collection({
    itemScope: '.veil',
    item: {
    }
  }),

  isFigure(name) {
    var className = $('.flip-card-figure > div')[0].className;

    return className.indexOf(name) >= 0;
  }
});

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
});

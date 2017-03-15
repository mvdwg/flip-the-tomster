import {
  create,
  clickable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  clickDogFigure: clickable('.options-button:not(.selected) .options-button-figure')
});

import { test } from 'qunit';
import moduleForAcceptance from 'flip-the-tomster/tests/helpers/module-for-acceptance';
import page from 'flip-the-tomster/tests/pages/options';
import game from 'flip-the-tomster/tests/pages/application';

moduleForAcceptance('Acceptance | game configuration', {
  beforeEach() {
    window.localStorage.clear();
  }
});

test('User picks a different figure', function(assert) {
  page
    .visit()
    .clickOn('Options')
    .clickDogFigure()
    .clickOn('Go Back')
    .clickOn('New Game');

  game
    .unselectedCards(0)
    .click();

  andThen(function() {
    assert.ok(game.isFigure('dog'), "Uses dog figures");
  });
});

import { moduleFor, test } from 'ember-qunit';

moduleFor('service:audio', 'Unit | Service | audio', {});

test('Init two audio players', function(assert) {
  let service = this.subject();

  assert.ok(service.get('music'));
  assert.ok(service.get('fx'));
});

test('Play music', function(assert) {
  // TODO: Resolver la URL dinamicamente
  assert.expect(5);

  let service = this.subject();

  service.play('MUSIC', service.get('gameMusicTrack'));

  assert.equal(service.get('currentMusicTrack'), service.get('gameMusicTrack'));
  assert.equal(service.get('music.src'), `http://localhost:7357${service.get('gameMusicTrack')}`);
  assert.ok(service.get('isMusicPlaying'));
  assert.equal(service.get('music.volume'), '0.8', 'Default volume.');
  assert.notOk(service.get('music.loop'), 'Default is not a loop.');

  service.stop('MUSIC');
});

test('Play FX', function(assert) {
  // TODO: Resolver la URL dinamicamente
  assert.expect(5);

  let service = this.subject();

  service.play('FX', service.get('gameMusicTrack'));

  assert.equal(service.get('currentFxTrack'), service.get('gameMusicTrack'));
  assert.equal(service.get('fx.src'), `http://localhost:7357${service.get('gameMusicTrack')}`);
  assert.ok(service.get('isFxPlaying'));
  assert.equal(service.get('fx.volume'), '0.8', 'Default volume.');
  assert.notOk(service.get('fx.loop'), 'Default is not a loop.');

  service.stop('FX');
});

test('Stop music', function(assert) {
  assert.expect(2);

  let service = this.subject();

  service.play('MUSIC', service.get('gameMusicTrack'));

  service.stop('MUSIC');

  assert.equal(service.get('currentMusicTrack'), null);
  assert.notOk(service.get('isMusicPlaying'));
});

test('Stop fx', function(assert) {
  assert.expect(2);

  let service = this.subject();

  service.play('FX', service.get('gameMusicTrack'));

  service.stop('FX');

  assert.equal(service.get('currentFxTrack'), null);
  assert.notOk(service.get('isfXPlaying'));
});

test('Players Volume', function(assert) {
  let service = this.subject();

  service.play('MUSIC', service.get('gameMusicTrack'), 0);
  service.play('FX', service.get('menuMusicTrack'), 1);

  assert.equal(service.get('music.volume'), '0', 'Music is muted.');
  assert.equal(service.get('fx.volume'), '1');

  service.stop('MUSIC');
  service.stop('FX');
});

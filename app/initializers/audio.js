export function initialize(application) {
  application.inject('route', 'audio', 'service:audio');
  application.inject('component', 'audio', 'service:audio');
}

export default {
  name: 'audio',
  initialize
};

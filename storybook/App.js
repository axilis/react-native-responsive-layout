import { getStorybookUI, configure } from '@storybook/react-native';

// Import stories
configure(() => {
  /* eslint-disable-next-line */
  require('./stories/');
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
const Storybook = getStorybookUI({});

export default Storybook;

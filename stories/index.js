import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

storiesOf('Button', module)
  .add('default', () => (
    <Button >Hello Button</Button>
  ))
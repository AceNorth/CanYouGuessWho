import {Text} from 'react-native';
import React from 'react';
import {GuessButton} from './GuessButton';
import {fireEvent, render} from '@testing-library/react-native';

const mockedOnPress = jest.fn();

describe('GuessButton component', () => {
  it('fires its onPress method when pressed', () => {
    const {getByText} = render(
      <GuessButton backgroundColor="blue" onPress={mockedOnPress}>
        <Text>Cool thing</Text>
      </GuessButton>,
    );
    fireEvent.press(getByText('Cool thing'));
    expect(mockedOnPress).toHaveBeenCalled();
  });
});

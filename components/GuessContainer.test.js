import {Text} from 'react-native';
import React from 'react';
import {GuessContainer} from './GuessContainer';
import {fireEvent, render} from '@testing-library/react-native';

const mockedOnPress = jest.fn();

describe('GuessContainer component', () => {
  it('fires its onPress method when pressed', () => {
    const {getByText} = render(
      <GuessContainer
        backgroundColor="blue"
        isSelected={false}
        onPress={mockedOnPress}>
        <Text>Cool thing</Text>
      </GuessContainer>,
    );
    fireEvent.press(getByText('Cool thing'));
    expect(mockedOnPress).toHaveBeenCalled();
  });
});

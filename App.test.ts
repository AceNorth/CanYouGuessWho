import {determineColorOfGuessButton} from './App';
import {colors} from './constants/colors';

describe('determineColorOfGuessButton function', () => {
  it('works', () => {
    const color = determineColorOfGuessButton(true, true, false);
    expect(color).toBe(colors.gray);
  });
});

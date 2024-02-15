import {calculateRelativeDate} from './relative-date';
import { expect } from '@open-wc/testing';

describe('Calculate Relative Date', () => {
  it('Today', () => {
    const input  = new Date(2024,1,1);
    const expected = 'TODO: Please see the above requirement';
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
});

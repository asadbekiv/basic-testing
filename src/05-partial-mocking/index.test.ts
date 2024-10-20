// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const mockModule = {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
  return mockModule;
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    jest.spyOn(console, 'log').mockImplementation(() => null);
    mockOne();
    mockTwo();
    mockThree();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    jest.spyOn(console, 'log').mockImplementation((): null => null);
    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});

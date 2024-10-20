// Uncomment the code below and write your tests

import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const end = '/todos/1';
  beforeAll(() => jest.useFakeTimers());
  beforeEach(() => jest.runOnlyPendingTimers());
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.useRealTimers());

  test('should create instance with provided base url', async () => {
    const spyOnCreateInstance: jest.SpyInstance<AxiosInstance> = jest.spyOn(
      axios,
      'create',
    );

    await throttledGetDataFromApi(end);
    expect(spyOnCreateInstance).lastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spyOnGet: jest.SpyInstance = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(end);

    expect(spyOnGet).lastCalledWith(end);
  });

  test('should return response data', async () => {
    type TodoType = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const expectResponseData: TodoType = {
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean),
    };

    const responseData = await throttledGetDataFromApi(end);
    expect(responseData).toEqual(expect.objectContaining(expectResponseData));
  });
});

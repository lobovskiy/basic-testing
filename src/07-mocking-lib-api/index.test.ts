// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/');

    expect(axios.create).toBeCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    const PATH = '/posts/1';
    const spyAxiosPrototypeGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({});

    await throttledGetDataFromApi(PATH);

    jest.runAllTimers();

    expect(spyAxiosPrototypeGet).toBeCalledWith(PATH);
  });

  test('should return response data', async () => {
    const PATH = '/posts';
    const DATA = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: DATA }));

    const data = await throttledGetDataFromApi(PATH);

    expect(data).toEqual(DATA);
  });
});

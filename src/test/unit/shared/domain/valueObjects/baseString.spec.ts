import { BaseString } from '../../../../../app/boundedContext/shared/domain/valueObjects/baseString';

// eslint-disable-next-line max-lines-per-function
describe('Unit test to Base String Value Object', () => {
  const randomString = 'Random String';
  const baseString = new BaseString(randomString);

  test('Should get value of randomString when call method getValue()', async () => {
    expect(baseString.getValue()).toEqual(randomString);
  });

  test('Should get value of randomString when call method toString()', async () => {
    expect(baseString.toString()).toEqual(randomString);
  });

  test('Should get true if randomString on method equals are the same', async () => {
    expect(baseString.equals(randomString)).toEqual(true);
  });

  test('Should get false if randomString on method equals are not the same', async () => {
    expect(baseString.equals('123')).toEqual(false);
  });
});

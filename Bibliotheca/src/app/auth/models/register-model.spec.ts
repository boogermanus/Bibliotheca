import { RegisterModel } from './register-model';

describe('RegisterModel', () => {
  it('should create an instance', () => {
    expect(new RegisterModel("test@test.com","test","test")).toBeTruthy();
  });
});

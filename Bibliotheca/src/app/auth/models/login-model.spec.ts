import { LoginModel } from './login-model';

describe('LoginModel', () => {
  it('should create an instance', () => {
    expect(new LoginModel("test","test")).toBeTruthy();
  });
});

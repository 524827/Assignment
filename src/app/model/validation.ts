
export class ValidationMsg {
  public validationMsg = {
    username: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter valid email.' },
    ],
    password: [{ type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'pattern', message: ' atleast 1 lowerCase, 1 upperCase, 1 numeric or special character and 8 character long' }],
    confirmPassword: [
      { type: 'equalTo', message: 'password not match.' },
    ],
  };
}

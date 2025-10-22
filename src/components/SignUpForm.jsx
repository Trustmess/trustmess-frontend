import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
// Import formik & YUP (for validation)
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Import APIs
import { createUser } from '/src/api/requests';

// Validation form
const signupSchema = Yup.object({
  username: Yup.string()
    .min(6, 'Use minimum 6 symbols')
    .max(20, 'Use max 20 symbols')
    .required('Enter login'),
  password: Yup.string()
    .min(6, 'Use minimum 6 symbols')
    .max(20, 'Use max 20 symbols')
    .required('Enter password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords is not same')
    .required('Confirm password'),
});

export const SignUpForm = () => {
  // Routing
  const navigate = useNavigate();
  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // Submit form
  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    console.log('Sign Up values before sending:', values);
    setIsLoading(true);
    try {
      // API Request
      const newUser = await createUser(values);
      console.log('User successfully created');
      // Tepmorary
      alert(
        `Account was created! Your login: ${values.username}, your password: ${values.password}`,
      );

      // Go to Login page
      navigate('/login');

      resetForm();
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      // Alwais on end
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          <div className='form_title'>Create account</div>

          {/* Username field */}
          <Field name='username'>
            {({ field, meta }) => (
              <div className={`login_label ${meta.touched && meta.error ? 'input-error' : ''}`}>
                <input
                  {...field}
                  type='text'
                  placeholder={meta.touched && meta.error ? meta.error : 'Username'}
                />
              </div>
            )}
          </Field>

          {/* Password field */}
          <Field name='password'>
            {({ field, meta }) => (
              <div className={`password_label ${meta.touched && meta.error ? 'input-error' : ''}`}>
                <input
                  {...field}
                  type='password'
                  placeholder={meta.touched && meta.error ? meta.error : 'Password'}
                />
              </div>
            )}
          </Field>

          {/* Confirm Password field */}
          <Field name='confirmPassword'>
            {({ field, meta }) => (
              <div className={`password_label ${meta.touched && meta.error ? 'input-error' : ''}`}>
                <input
                  {...field}
                  type='password'
                  placeholder={meta.touched && meta.error ? meta.error : 'Confirm Password'}
                />
              </div>
            )}
          </Field>

          {/* Base form error */}
          {errors.submit && <div className='error_message submit_error'>{errors.submit}</div>}

          {/* Submit button (Sign Up)*/}
          <Button className='btn sign_up_btn' type='submit' disabled={isLoading}>
            {isLoading ? 'Wait...' : 'Sign Up'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

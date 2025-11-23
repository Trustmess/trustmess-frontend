// Import formik & YUP (for validation)
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { Button } from './Button';
import { login } from '/src/api/requests';
import { useAuth } from '@contexts';
// import { useAuth } from '/src/contexts/AuthContext';

// Validation form
const loginSchema = Yup.object({
  username: Yup.string().min(6, 'Use minimum 6 symbols').required('Enter login'),
  password: Yup.string().min(6, 'Use minimum 6 symbols').required('Enter password'),
});

export const LogInForm = () => {
  // Routing
  const navigate = useNavigate();
  const { login: setUser } = useAuth();

  // Submit form
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // console.log('Form values:', values);

      // API Request
      const response = await login(values);
      console.log('Successfull response from server:', response.user);

      if (response.status === 'success') {
        console.log('Login Successfull:', response.user.username);
        setUser(response.user);
        navigate('/messenger');
      } else {
        console.log('Login failed');
        setErrors({ submit: 'Wrong login or password' });
      }

      setSubmitting(false);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Login failed' });
      setSubmitting(false);
    }
  };

  // New form
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          <div className='form_title'>Enter login and password</div>

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

          {errors.submit && <div className='error_message submit_error'>{errors.submit}</div>}

          <Button className='btn log_in_btn' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Log In'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

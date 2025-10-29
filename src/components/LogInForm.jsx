import { Button } from './Button';
// Import formik & YUP (for validation)
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { getUserByName } from '/src/api/requests';

// Validation form
const loginSchema = Yup.object({
  username: Yup.string().min(6, 'Use minimum 6 symbols').required('Enter login'),
  password: Yup.string().min(6, 'Use minimum 6 symbols').required('Enter password'),
});

export const LogInForm = () => {
  // Routing
  const navigate = useNavigate();

  // Submit form
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log('Form values:', values);
      console.log('Inputed username: ', values.username);

      // API Request
      const getUser = await getUserByName(values.username);
      const user = getUser[0];
      console.log('Unpacked user from DB: ', user);
      console.log('user login: ', user.username);
      console.log('user password: ', user.password);

      if (values.username === user.username && values.password === user.password) {
        console.log('Log in was successfull');
        console.log('Go to messeging');

        navigate('/messenger');
      } else {
        console.log('Wrong login or password');
        setErrors({ submit: 'Wrong login or password' });
      }
      setSubmitting(false);

      // End API Request
    } catch (error) {
      console.error('Something wrong...');
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

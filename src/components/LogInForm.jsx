import { Button } from './Button';
// Import google material icons
// import '/node_modules/material-icons/iconfont/material-icons.css';
// Import formik & YUP (for validation)
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation form
const loginSchema = Yup.object({
  username: Yup.string().min(6, 'Use minimum 6 symbols').required('Enter login'),
  password: Yup.string().min(6, 'Use minimum 6 symbols').required('Enter password'),
});

// Submit form
const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    console.log('Form values:', values);

    // API Request
    // End API Request

    // Simulation delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Tepmorary
    alert(`Your login: ${values.username}, your password: ${values.password}`);
  } catch (error) {
    setErrors({ submit: 'Wrong login or password' });
  } finally {
    // Alwais on end
    setSubmitting(false);
  }
};

export const LogInForm = () => {
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

  // Old form
  // return (
  //   <>
  //     <form>
  //       <div className='form_title'>Enter login and password</div>
  //       <div className='login_label'>
  //         {/* <span>Login:</span> */}
  //         <input type='text' placeholder='Username' />
  //       </div>
  //       <div className='password_label'>
  //         {/* <span>Password:</span> */}
  //         <input type='password' placeholder='Password' />{' '}
  //       </div>
  //       <Button className={'btn log_in_btn'} onClick={() => alert('Button clicked!')}>
  //         Log In
  //       </Button>
  //     </form>
  //   </>
  // );
};

import React from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { TextInput, PasswordInput, Button, Banner, SelectInput } from '../components';
import { metaSelector, action } from '../redux/entities/auth';
import { errorParser } from '../utils';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const ioRequest = useSelector((state) => metaSelector(state).read);

  const { error, loading, success } = ioRequest;
  const reset = () => dispatch(action.readAction({}).reset);

  if (success) {
    router.push('/home');
  }

  const schema = Yup.object({
    password: Yup.string().required(),
    email: Yup.string().email().required(),
    type: Yup.string().required(),
  });

  return (
    <div className="page-content d-flex align-items-center justify-content-center page-content-sign-in-wrapper">
      <div className="row w-100 mx-0 auth-page">
        <div className="col-md-8 col-xl-6 mx-auto">
          <div className="card">
            <div className="row">
              <div className="col-md-2 pr-md-0">
                <div className="auth-left-wrapper"></div>
              </div>
              <div className="col-md-8 pl-md-0">
                <div className="auth-form-wrapper px-4 py-5">
                  <h5 className="text-muted font-weight-normal mb-4">Welcome back! Log in to your account.</h5>

                  {error && <Banner.Error message={error.message} reset={reset} />}

                  <Formik
                    initialValues={{ email: '', password: '', type: '' }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                      reset();
                      dispatch(action.readAction(values).loading);
                    }}
                  >
                    {(props) => {
                      const { handleChange, handleBlur, values, handleSubmit, errors, touched } = props;

                      return (
                        <form className="forms-sample" onSubmit={handleSubmit}>
                          <TextInput
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email address"
                            label="Email"
                            value={values.email}
                            error={errorParser(errors, touched, 'email')}
                          />

                          <PasswordInput
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                            label="Password"
                            value={values.password}
                            error={errorParser(errors, touched, 'password')}
                          />
                          <SelectInput
                            name="type"
                            data={['customer', 'brand']}
                            placeholder="choose user type"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.type}
                            label="Select user type"
                            error={errorParser(errors, touched, 'type')}
                          />

                          <Button text="Login" isSubmitting={loading} />
                          <div className="d-flex flex-row justify-content-between">
                            <a rel="noreferrer" className="d-block mt-3 text-muted" href="/signup">
                              Not a user? Sign up
                            </a>
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { TextInput, PasswordInput, Button, Banner } from '../../components';
import { metaSelector, action } from '../../redux/entities/auth';
import { errorParser } from '../../utils';

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const ioRequest = useSelector((state) => metaSelector(state).create);
  const { error, loading, success } = ioRequest;

  const reset = () => dispatch(action.createAction({}).reset);

  if (success) {
    router.push('/');
  }

  const schema = Yup.object({
    password: Yup.string().required(),
    email: Yup.string().email().required(),
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
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
                  <a href="#" className="noble-ui-logo d-block mb-2">
                    Qii<span>bee</span>
                  </a>
                  <h5 className="text-muted font-weight-normal mb-4">Create your customer account</h5>

                  {error && <Banner.Error message={error.message} reset={reset} />}

                  <Formik
                    initialValues={{ email: '', password: '', firstname: '', lastname: '', type: 'customer' }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                      reset();
                      dispatch(action.createAction(values).loading);
                    }}
                  >
                    {(props) => {
                      const { handleChange, handleBlur, values, handleSubmit, errors, touched } = props;

                      return (
                        <form className="forms-sample" onSubmit={handleSubmit}>
                          <TextInput
                            name="firstname"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="First Name"
                            label="First Name"
                            value={values.firstname}
                            error={errorParser(errors, touched, 'firstname')}
                          />
                          <TextInput
                            name="lastname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Last Name"
                            label="Last Name"
                            value={values.lastname}
                            error={errorParser(errors, touched, 'lastname')}
                          />
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

                          <Button text="Sign up" isSubmitting={loading} />
                          <div className="d-flex flex-row justify-content-between">
                            <a href="/" rel="noreferrer" className="d-block mt-3 text-muted">
                              Already a user? Sign in
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

import React from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useRouter } from "next/router";

import {
  TextInput,
  PasswordInput,
  Button,
  Banner,
  MediaInput,
} from "../../components";
import { metaSelector, action } from "../../redux/entities/auth";
import { errorParser } from "../../utils";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const ioRequest = useSelector((state) => metaSelector(state).create);
  const { error, loading, success } = ioRequest;

  const reset = () => dispatch(action.createAction({}).reset);

  if (success) {
    router.push("/");
  }
  const schema = Yup.object({
    password: Yup.string().required(),
    email: Yup.string().email().required(),
    brandName: Yup.string().required(),
    brandSymbol: Yup.string().required(),
    brandLogo: Yup.string().required(),
    maxLoyaltyPoint: Yup.number().required(),
    type: Yup.string().default("brand"),
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
                  <h5 className="text-muted font-weight-normal mb-4">
                    Create your brand account
                  </h5>
                  {error && (
                    <Banner.Error message={error.message} reset={reset} />
                  )}

                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      brandName: "",
                      brandSymbol: "",
                      brandLogo: "",
                      maxLoyaltyPoint: "",
                      type: "brand",
                    }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                      reset();
                      dispatch(action.createAction(values).loading);
                    }}
                  >
                    {(props) => {
                      const {
                        handleChange,
                        handleBlur,
                        values,
                        handleSubmit,
                        errors,
                        touched,
                        setFieldValue,
                      } = props;

                      return (
                        <form className="forms-sample" onSubmit={handleSubmit}>
                          <TextInput
                            name="brandName"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Brand Name"
                            label="Brand Name"
                            value={values.brandName}
                            error={errorParser(errors, touched, "brandName")}
                          />
                          <MediaInput
                            label="Brand Symbol"
                            alt="symbol"
                            multiple
                            getFile={(file) =>
                              setFieldValue("brandSymbol", file)
                            }
                            error={errorParser(errors, touched, "brandSymbol")}
                          />
                          <MediaInput
                            label="Brand Logo"
                            alt="logo"
                            multiple
                            getFile={(file) => setFieldValue("brandLogo", file)}
                            error={errorParser(errors, touched, "brandLogo")}
                          />
                          <TextInput
                            name="maxLoyaltyPoint"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Max Loyalty Point"
                            label="Max Loyalty Point"
                            value={values.maxLoyaltyPoint}
                            error={errorParser(
                              errors,
                              touched,
                              "maxLoyaltyPoint"
                            )}
                          />
                          <TextInput
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email address"
                            label="Email"
                            value={values.email}
                            error={errorParser(errors, touched, "email")}
                          />

                          <PasswordInput
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                            label="Password"
                            value={values.password}
                            error={errorParser(errors, touched, "password")}
                          />

                          <Button text="Sign up" isSubmitting={loading} />
                          <div className="d-flex flex-row justify-content-between">
                            <a
                              href="/"
                              rel="noreferrer"
                              className="d-block mt-3 text-muted"
                            >
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

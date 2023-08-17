import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.jsx';

import registration from '../assets/registration.webp';

const SignUp = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [failedMsg, setFailedMsg] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required(t('signup.username.required'))
      .min(3, t('signup.username.min'))
      .max(20, t('signup.username.max')),
    password: Yup.string()
      .trim()
      .required(t('signup.password.required'))
      .min(6, t('signup.password.min')),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], t('signup.password.oneof'))
      .required(t('signup.password.required')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setFailedMsg('');
      try {
        const response = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });
        auth.logIn(response.data);
        localStorage.setItem('userId', JSON.stringify(response.data));
        navigate('/');
      } catch (err) {
        console.log(err);
        if (!err.isAxiosError) {
          throw err;
        }
        if (err.response.status === 409) {
          inputRef.current.select();
          setFailedMsg('Такой пользователь уже существует');
          throw new Error('Такой пользователь уже существует');
        }
        toast.warn(t('toast.networkProblem'));
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={registration}
                  height={150}
                  width={150}
                  className="rounded-circle"
                  alt=""
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('registration')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder="Имя пользователя"
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    ref={inputRef}
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || failedMsg
                    }
                  />
                  <Form.Label htmlFor="username">{t('username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="Пароль"
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || failedMsg
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="Подтвердите пароль"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    autoComplete="new-password"
                    isInvalid={
                      (formik.errors.confirmPassword
                        && formik.touched.confirmPassword)
                        || failedMsg
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {failedMsg || formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">
                    {t('passwordConfirm')}
                  </Form.Label>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Регистрироваться
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

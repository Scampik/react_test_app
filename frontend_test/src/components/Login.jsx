import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

import loginImage from '../assets/login.png';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn(response.data);

        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        console.log(err);
        // toast.error(t("toast.networkProblem"));
        if (err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
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
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginImage}
                  height={150}
                  width={150}
                  className="rounded-circle"
                  alt="Vxod"
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('enter')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="Ваш ник"
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">
                      {t('yourNickname')}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Пароль"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Label htmlFor="password">{t('password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {t('failedLogin')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                    variant="outline-primary"
                  >
                    {t('enter')}
                  </Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('invite')}
                </span>
                <Link to="/signup">{t('registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

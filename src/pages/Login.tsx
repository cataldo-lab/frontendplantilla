import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service.js';
import Form from '@components/Form';
import useLogin from '@hooks/auth/useLogin';
import '@styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const {
    errorEmailOrUser,
    errorPassword,
    errorData,
    setErrorData,
    handleInputChange
  } = useLogin();

  const loginSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.status === 'Success') {
        navigate('/home');
      } else if (response.status === 'Client error') {
        setErrorData(response.details);
      }
    } catch (err) {
      console.error(err);
      setErrorData('Error de conexión, intenta de nuevo más tarde.');
    }
  };

  return (
    <>
      <div className="background-clouds" />

      <main className="container">
        {/* Mensaje de error global */}
        {errorData && <div className="form-error">{errorData}</div>}

        <Form
          title="Iniciar sesión"
          fields={[
            {
              label: 'Correo electrónico o usuario',
              name: 'emailOrUser',
              placeholder: 'usuario o ejemplo@gmail.cl',
              fieldType: 'input',
              type: 'text',
              required: true,
              minLength: 3,
              maxLength: 30,
              errorMessageData: errorEmailOrUser,
              validate: {
                custom: (value) => {
                  const isGmail    = value.endsWith('@gmail.cl');
                  const isUsername = /^[a-zA-Z0-9._]{3,30}$/.test(value);
                  return (
                    isGmail ||
                    isUsername ||
                    'Debe ser un correo @gmail.cl o un nombre de usuario válido (3–30 chars)'
                  );
                }
              },
              onChange: (e) => handleInputChange('emailOrUser', e.target.value)
            },
            {
              label: 'Contraseña',
              name: 'password',
              placeholder: '**********',
              fieldType: 'input',
              type: 'password',
              required: true,
              minLength: 8,
              maxLength: 26,
              pattern: /^[a-zA-Z0-9]+$/,
              patternMessage: 'Debe contener solo letras y números',
              errorMessageData: errorPassword,
              onChange: (e) => handleInputChange('password', e.target.value)
            }
          ]}
          buttonText="Iniciar sesión"
          onSubmit={loginSubmit}
          footerContent={
            <p>
              ¿No tienes cuenta? <a href="/register">¡Regístrate aquí!</a>
            </p>
          }
        />
      </main>
    </>
  );
};

export default Login;

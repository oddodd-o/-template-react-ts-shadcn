import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface LoginProps {
  taskType?: string;
}

const Login: React.FC<LoginProps> = ({ taskType = '' }) => {
  const [formData, setFormData] = useState({
    manager_id: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    idError: false,
    loginError: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // JSP에서 마이그레이션: 입력 필드 스타일 처리
    const inputs = document.querySelectorAll('.loginSec input.ipt');
    inputs.forEach((input: Element) => {
      if ((input as HTMLInputElement).value !== '') {
        input.className = 'ipt';
      }
    });
  }, []);

  const checkLoginForm = (): boolean => {
    if (!formData.manager_id) {
      alert('Enter your ID.');
      return false;
    }
    if (!formData.password) {
      alert('Enter your password.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkLoginForm()) return;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          taskType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/dashboard');
      } else {
        setErrors({
          idError: data.errorType === 'ID',
          loginError: data.errorType === 'PASSWORD',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors({ idError: false, loginError: false });
  };

  const handleExternalLink = (uri: string, target?: string) => {
    if (!uri) return;

    switch (target) {
      case '_blank':
        window.open(uri, '', '');
        break;
      case '_top':
        top.window.location.href = uri;
        break;
      case '_parent':
        window.parent.location.href = uri;
        break;
      default:
        window.location.href = uri;
    }
  };

  const openContactUs = () => {
    const width = 820;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
        '/pop/contactUs.do',
        'ContactUs',
        `width=${width}, height=${height}, top=${top}, left=${left}, scrollbars=yes, resizable=yes`
    );
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="mb-8">
          <img src="/images/skin/logo.gif" alt="Hyosung TNS" className="h-12" />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="taskType" value={taskType} />

            <div className="space-y-2">
              <label htmlFor="manager_id" className="block text-sm font-medium">
                ID
              </label>
              <input
                  type="text"
                  id="manager_id"
                  name="manager_id"
                  value={formData.manager_id}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.idError ? 'border-red-500' : ''
                  }`}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.loginError ? 'border-red-500' : ''
                  }`}
              />
            </div>

            {(errors.idError || errors.loginError) && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>
                {errors.idError ? 'Check your ID.' : 'Check your password.'}
              </span>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>

        <div className="mt-8 flex space-x-4">
          <button
              onClick={() => handleExternalLink('http://www.hyosung-tns.com/english/images/pdf/CorporateBrochure.pdf', '_blank')}
              className="px-4 py-2 text-blue-600 hover:underline"
          >
            Corporate Brochure
          </button>
          <button
              onClick={() => handleExternalLink('http://www.hyosung-tns.com/en/m21.php', '_blank')}
              className="px-4 py-2 text-blue-600 hover:underline"
          >
            Brochure for Download
          </button>
          <button
              onClick={openContactUs}
              className="px-4 py-2 text-blue-600 hover:underline"
          >
            Contact Us
          </button>
        </div>
      </div>
  );
};

export default Login;

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { auth } from '../../api/services/firebase.js';
import { FaGithub } from "react-icons/fa6";
import { signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import Cookies from 'js-cookie';



export default function LoginPage() {
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    const token = Cookies.get('userToken');
    setUserToken(token);
    if (token) {
      router.push('/board');
    }
  }, []);

  const router = useRouter();

  const provider = new GithubAuthProvider();

  const signInWithGithub = () => {
    signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        const { displayName, email, photoUrl, screenName } = user.reloadUserInfo;
        Cookies.set('userToken', token);
        Cookies.set('userDisplayName', displayName);
        Cookies.set('userPhotoUrl', photoUrl);
        Cookies.set('userEmail', email);

        router.push('/board');

      }).catch((error) => {
        alert(error.message);
      });
  }

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const changeUser = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

    
      const user = userCredential.user;
      
      const { accessToken, displayName, email, photoURL } = user ;
        Cookies.set('userToken', accessToken);
        Cookies.set('userDisplayName', displayName);
        Cookies.set('userPhotoUrl', photoURL);
        Cookies.set('userEmail', email);
        console.log('User', user)
      
      
      
      router.push('/board');
    } catch (error) {
      console.error('Login Error:', error.message); // Logging error message
      // Provide feedback to the user
      alert(error.message); // Display Firebase error message
    }
  };

  return (

    !userToken ? (

      <div className='h-screen w-screen text-white flex flex-col items-center justify-center gap-4'>
        <picture className='flex justify-center items-center pb-6'>
          <source srcSet="/logo.png" type="image/png" />
          <img className='w-[200px]' src="/logo.png" alt="logo" />
        </picture>
        <button onClick={signInWithGithub} className='shadow-sm border text-foreground p-7 w-64 h-10 rounded-md flex  items-center '>
          <FaGithub className='text-2xl' />
          <span className='flex-1'>Ingresar con Github</span>
        </button>

        <span className='w-full text-center text-foreground text-bold'>O</span>

        <form onSubmit={loginUser} className='flex flex-col w-[500px] gap-[20px] justify-center items-center'>


          <input
            className='bg-secondary border px-4 py-2 rounded-md text-black w-96'
            name='email'
            type="text"
            placeholder='Ingresa tu correo'
            value={credentials.email}
            onChange={changeUser}
          />
          <input
            className='bg-secondary border px-4 py-2 rounded-md text-black w-96'
            name='password'
            type="password"
            placeholder='Ingresa tu contraseña'
            value={credentials.password}
            onChange={changeUser}
          />
          <button
            type='submit'
            className='bg-primary p-2 rounded-md w-96 cursor-pointer'
          >
            Iniciar Sesión
          </button>
          <a onClick={() => router.push('/auth/register')} className='text-foreground cursor-pointer'>REGISTRARSE</a>
        </form>
      </div>
    ) : router.push('/board')

  );
}
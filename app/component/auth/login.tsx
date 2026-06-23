'use client';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[haveAccount, setHaveAccount] = useState(true);
  const[forgotPassword, setForgotPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(!isOpen) {
        setEmail('');   
        setPassword('');
        setError('');
        setHaveAccount(true);
        setForgotPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      router.push('/for-you');
    } catch (error: any) {
      alert(error.message);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onClose();
      router.push('/for-you');
    } catch (error: any) {
      console.error("Google Login Error:", error.message);
    }
  };

  const guestLogin = async () => {
    try {
      onClose();
      router.push('/for-you');
    } catch (error: any) {
      console.error("Guest Login Error:", error.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    setEmail('');   
    setPassword('');
    setError('');
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Account created:", userCredential.user);
        onClose();
        router.push('/for-you');
    } catch (error: any) {
        alert(error.message);
        setError(error.message);

    }
};

const handleResetPassword = async () => {
  setEmail('');   
  setPassword('');
  setError('');
  if (!email) {
    alert("Please enter your email first so we know where to send the link.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Check your inbox! A password reset link has been sent.");
  } catch (error: any) {
    alert(error.message);
  }
};


  return (
    <div className="auth">
      <div className="auth__content">
        <button onClick={onClose} className='close__btn'>✕</button>
        {haveAccount && !forgotPassword && (
          <h2 className="login__title">Login into Summarist</h2>
        )}
        {forgotPassword && (
          <h2 className="login__title">Reset Your Password</h2>
        )}
        {!haveAccount && !forgotPassword && (
          <h2 className="login__title">Sign Up to Summarist</h2>
        )}
        {error && <p className="error">{error}</p>}

        {haveAccount && !forgotPassword && (
            <button className="login__btn guest__login--btn" onClick={guestLogin}>
                <figure className="guest__icon--mask">
                    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                    </svg>
                </figure>
                <div>Login as a Guest</div>
            </button>  
        )}
         {haveAccount && !forgotPassword && (
            <div className="divider">
            <span className="divider__line"></span>
            <span className="divider__text">or</span>
            <span className="divider__line"></span>
        </div>
         )}

        {!forgotPassword &&(
            <button  className="login__btn google__login--btn" onClick={handleGoogleLogin}>
                <figure className="google__icon--mask">
                    <img src="/google.png" alt="Google Icon" className="w-5 h-5" />
                </figure>
                {haveAccount && (   
                    <div>Login with Google</div>
                )}
                {!haveAccount && (
                    <div>Sign Up with Google</div>
                )}
             </button>
        )}
        
        {!forgotPassword && 
            <div className="divider">
                <span className="divider__line"></span>
                <span className="divider__text">or</span>
                <span className="divider__line"></span>
            </div>
        }
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" 
                placeholder="Email" 
                className="form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
          {!forgotPassword && (
            <input type="password" 
                placeholder="Password" 
                className="form__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
          )}
        
            {haveAccount && !forgotPassword && (
                <button type="submit" className="btn"> Log In </button>
            )}
            {!haveAccount && !forgotPassword && (
                <button type="submit" className="btn" onClick={handleSignUp}> Sign Up </button>
            )}
            {forgotPassword && (
                <button type="submit" className="btn" onClick={handleResetPassword}> Send Reset Password link </button>
            )}
        </form>
        <div className='password__new-account--wrapper'>
            {!forgotPassword && haveAccount && (
                <button className='forgot__password--btn' onClick={() => {setForgotPassword(true); setEmail(''); setPassword(''); setError('');}}>Forgot your password?</button>
            )}
            
            {forgotPassword && (
                <button className='forgot__password--btn' onClick={() => {setForgotPassword(false); setEmail(''); setPassword(''); setError('');}}>Go to Login</button>   
            )}
            {haveAccount &&  !forgotPassword &&(
                <button className='new__account forgot__password--btn' onClick={() => {setHaveAccount(false); setEmail(''); setPassword(''); setError('');}}>Don't have an account?</button>
            )}
            {!haveAccount && !forgotPassword && (
                <button className='new__account forgot__password--btn' onClick={() => {setHaveAccount(true); setEmail(''); setPassword(''); setError('');}}>Already have an account?</button>
            )}
         </div>
        
      </div>
    </div>
  );
}
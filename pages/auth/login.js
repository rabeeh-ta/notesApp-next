import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function login() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push('/');
  }

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
    if (res.status === 200) {
      router.push('/');
    } else {
      alert('wrong credentials');
    }
  }
  return (
    <>
      <h1>login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>email</label>
        <input
          type="email"
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
        />
        <br />
        <label>password</label>
        <input
          type="text"
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        />
        <br />
        <button type="submit" value="Login">
          login
        </button>
      </form>
    </>
  );
}

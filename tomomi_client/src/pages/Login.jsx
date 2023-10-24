import Header from '../components/App/Header';
import Login from "../components/User/Login";

export default function LoginPage() {
  return (
    <>
      <Header
        heading='Welcome back Fwuend! =-)'
        paragraph="Wanna join the fun? =-D "
        linkName='Reg here'
        linkUrl='/register'
      />
      <Login />
    </>
  );
}

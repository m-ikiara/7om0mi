import Header from '../components/App/Header';
import Signup from '../components/User/Signup.jsx';

export default function SignupPage() {
  return (
    <>
      <Header
        heading='Yay! New Fwuend! :3'
        paragraph='Already in the party? =-D '
        linkName='Login here'
        linkUrl='/'
      />
      <Signup />
    </>
  );
}

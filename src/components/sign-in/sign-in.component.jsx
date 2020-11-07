import React, {useState} from 'react';
import {connect} from 'react-redux'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';

import './sign-in.styles.scss';

// class SignIn extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     email: '',
  //     password: ''
  //   };
  // }
const SignIn = ({emailSignInStart, googleSignInStart} ) => {
  const [userCredentials, setCredentials] = useState({email: '', password: ''});
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    // const {emailSignInStart} = this.props;
    // const { email, password } = this.state;
    //  const { email, password } = userCredentials;
    emailSignInStart(email, password);

    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email: '', password: '' });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChange = event => {
    const { value, name } = event.target;

    // this.setState({ [name]: value });
    setCredentials({...userCredentials, [name]: value });
  };

  // render() {
  //   const {googleSignInStart} = this.props;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
// }
const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchToProps)(SignIn);

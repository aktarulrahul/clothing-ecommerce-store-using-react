import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
// import { auth, createUserProfileDocument} from './firebase/firebase.utils';
// import { setCurrentUser } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';
// import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

// class App extends React.Component {
//   unsubscribeFromAuth = null;

//   componentDidMount() {
//     // const { setCurrentUser } = this.props;

//     // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//     //   if (userAuth) {
//     //     const userRef = await createUserProfileDocument(userAuth);

//     //     userRef.onSnapshot(snapShot => {
//     //       setCurrentUser({
//     //         id: snapShot.id,
//     //         ...snapShot.data()
//     //       });
//     //     });
//     //   }

//     //   setCurrentUser(userAuth);
//       // addCollectionAndDocuments('collection', collectionsArray.map(({title, items}) => ({title, items})));
//     // });
//     const {checkUserSession} = this.props;
//     checkUserSession();
//   }

//   componentWillUnmount() {
//     this.unsubscribeFromAuth();
//   }
  const App = ({checkUserSession, currentUser})=>{
    useEffect(()=>{
      checkUserSession()
    },[checkUserSession])
  // render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
// }

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession:  ()=> dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React from 'react';
import {Route} from 'react-router-dom';
// import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

// import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

// import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // state = {
  //     loading: true,
  //   }
  // unsubscribeFromSnapshot = null;
  componentDidMount() {
  //   const {updateCollections} = this.props;
  //   const collectionRef = firestore.collection('collection');

  // // fetch('https://firestore.googleapis.com/v1/projects/clothing-ecommerce-react-c3cf5/databases/(default)/documents/collection')
  // // .then(response => response.json())
  // // .then(collections => console.log(collections))

  // collectionRef.get().then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({loading: false});
  //   })
  const { fetchCollectionsStart} = this.props;
  fetchCollectionsStart();
  }
  render(){
    const {match} = this.props;
    // const {loading} = this.state;
    return(
        <div className='shop-page'>
        <Route
        exact
        path={`${match.path}`}
        // render={(props) =><CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
        component={CollectionsOverviewContainer}
        />
        <Route
        path={`${match.path}/:collectionId`}
        // render={(props) =><CollectionPageWithSpinner isLoading={!selectIsCollectionsLoaded} {...props} />}
        component={CollectionPageContainer}
        />
      </div>
    )
  }
}

// const mapStateToProps = createStructuredSelector({
//   // isCollectionFetching: selectIsCollectionFetching,
//   selectIsCollectionsLoaded: selectIsCollectionsLoaded
// })

const mapDispatchToProps = dispatch => ({
  // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())

})
export default connect(null, mapDispatchToProps)(ShopPage);

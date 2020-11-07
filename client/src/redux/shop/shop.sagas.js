import {takeLatest, call, put, all} from 'redux-saga/effects';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {
fetchCollectionsSuccess,
fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){
    // yield console.log('I am fired');
try{
    const collectionRef = firestore.collection('collection');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
} catch (error){
    yield put(fetchCollectionsFailure(error.message));
}
    // const collectionRef = firestore.collection('collection');
    // collectionRef.get().then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
}

export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        );
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}
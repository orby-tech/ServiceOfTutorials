import  { combineReducers} from 'redux'

import  { ALL_CATALOG, CATALOG, NEW_ARTICLES_LIST, TOP_ARTICLES_LIST } from './types'

//initial state

function setAllCatalog(state = false, action) {
	if (action.type === ALL_CATALOG){
		return state = action.catalog
	}
	return state
}

function setCatalog(state = false, action) {
	if (action.type === CATALOG){
		return state = action.catalog
	}
	return state
}
function setNewArticlesList(state = false, action) {
	if (action.type === NEW_ARTICLES_LIST){
		return state = action.catalog
	}
	return state
}
function setTopArticlesList(state = false, action) {
	if (action.type === TOP_ARTICLES_LIST){
		return state = action.catalog
	}
	return state
}
export const rootReducer = combineReducers({
  allCatalog: setAllCatalog,
  catalog: setCatalog,
  newArticles: setNewArticlesList,
  topArticles: setTopArticlesList
})
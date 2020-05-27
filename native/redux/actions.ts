import  { ALL_CATALOG, CATALOG, NEW_ARTICLES_LIST, TOP_ARTICLES_LIST } from './types'


export function setAllCatalog(catalog) {
	return {
		type: ALL_CATALOG,
		catalog: catalog
	}
}
export function setCatalog(catalog) {
	return {
		type: CATALOG,
		catalog: catalog
	}
}
export function setNewArticles(catalog) {
	return {
		type: NEW_ARTICLES_LIST,
		catalog: catalog
	}
}
export function setTopArticles(catalog) {
	return {
		type: TOP_ARTICLES_LIST,
		catalog: catalog
	}
}
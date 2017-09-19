/** Global definitions for developement **/

// for redux devtools extension
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(args?: any): (args?: any) => any;
}

import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer, getUSersReducer } from "./userReducer";
import { allUsersReducer } from "./usersReducer";
import { allMarksReducer } from "./marksReducer";
// import { allUsersReducer } from "./usersReducer";
import {
  publicationListReducer,
  publicationSaveReducer,
} from "./publicationReducer";
import { carritoReducer } from './carritoReducer'
import { DenunciationReducer } from "./denunciationReducers";




export default combineReducers({
  // allUsers: allUsersReducer,
  users: getUSersReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  publicationList: publicationListReducer,
  publicationSave: publicationSaveReducer,
  carrito: carritoReducer,
  allUsers: allUsersReducer,
  allMarks: allMarksReducer,
  denunciation: DenunciationReducer
});

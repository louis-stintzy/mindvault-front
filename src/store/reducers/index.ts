import signupReducer from './signup';
import signinReducer from './signin';
import themeReducer from './theme';
import boxOneReducer from './boxOne';
import boxMultipleReducer from './boxMultiple';
import cardMultipleReducer from './cardMultiple';
import cardOneReducer from './cardOne';

const reducer = {
  signUp: signupReducer,
  signIn: signinReducer,
  theme: themeReducer,
  boxOne: boxOneReducer,
  boxMultiple: boxMultipleReducer,
  cardMultiple: cardMultipleReducer,
  cardOne: cardOneReducer,
};

export default reducer;

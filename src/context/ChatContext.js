import { createContext, useContext, useReducer} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const [ state, dispatch ] = useReducer(chatReducer, INITIAL_STATE);

    const chatReducer= (state, action ) => {

        if (action.type === "CHANGE_USER"){
            return {
                user: action.payload,
                chatId: currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
        }
        } else {
            return state;
        }
    }

    return(
    <ChatContext.Provider value={{ data:state, dispatch }}>
        { children }
    </ChatContext.Provider>
    );
};
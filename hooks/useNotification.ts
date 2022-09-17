import {useContext} from "react";
import {NotificationContext} from "../provider/NotificationProvider";

export const useNotification = () => useContext(NotificationContext);
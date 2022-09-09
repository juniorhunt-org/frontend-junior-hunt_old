import {useContext} from "react";
import {NotificationContext} from "../provider/notifications";

export const useNotification = () => useContext(NotificationContext);
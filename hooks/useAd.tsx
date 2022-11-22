import {useContext} from "react";
import {AdContext} from "../provider/AdProvider";

export const useAd = () => useContext(AdContext);

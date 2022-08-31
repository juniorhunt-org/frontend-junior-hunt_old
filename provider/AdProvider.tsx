import { createContext, FC, ReactNode, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { IAd } from "../types";
import { getReplyAds, requestAd } from "./api";

interface IContext {
	ad: IAd;
	setAd: (ad: IAd) => void;
	requestAd: () => void;
	getReplyAds: () => Promise<IAd[]>;
}

export const AdContext = createContext<IContext>({} as IContext);

interface IProvider {
	children: ReactNode;
}

export const AdProvider: FC<IProvider> = ({ children }) => {
	const [ad, setAd] = useState<IAd>({} as IAd);
	const { user } = useAuth();

	const requestAdHandler = async () => {
		await requestAd(user.token, ad);
	};

	const getReplyAdsHandler = async () => {
		return await getReplyAds(user.token);
	};

	const value = {
		ad,
		setAd,
		getReplyAds: getReplyAdsHandler,
		requestAd: requestAdHandler,
	};

	return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};

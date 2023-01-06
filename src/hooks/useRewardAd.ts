import { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

export const useRewardAd = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEarned, setIsEarned] = useState(false);

    const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1247882024503140/5264964651';
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setIsLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
            console.log('User earned reward of ', reward);
            setIsEarned(true);
        });

        // Start loading the rewarded ad straight away
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, [rewarded]);

    return {
        rewarded,
        isLoaded,
        isEarned,
        setIsEarned,
        setIsLoaded,
    };
};

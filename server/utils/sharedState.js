let balanceUpdatedWithin10SecondsFlag = false;

export const checkBalanceUpdatedWithin10Seconds = (userId) => {
    // Check the flag and return its value
    return balanceUpdatedWithin10SecondsFlag;
};

export const setBalanceUpdatedWithin10Seconds = () => {
    // Set the flag to true
    balanceUpdatedWithin10SecondsFlag = true;

    // Reset the flag after 10 seconds
    setTimeout(() => {
        balanceUpdatedWithin10SecondsFlag = false;
    }, 10000);
};

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

const BalanceToast = ({ showToast, balance }) => {
    const [toastId, setToastId] = useState(null);

    useEffect(() => {
        if (showToast && balance >= 500000) {
            const id = toast.custom(() => (
                <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <div className="flex-shrink-0">
                        <img
                            className="h-12 w-12 rounded-full"
                            src="https://img.freepik.com/free-vector/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept_74855-26108.jpg?w=826&t=st=1706186762~exp=1706187362~hmac=70319c86bc33fd8a7ad4c56ff29f2af06f388b168dc77a7d3a773cfa14e74aa3"
                            alt=""
                        />
                    </div>
                    <p className="text-xl text-black mb-6">
                        Contact Customer Service for further bets.
                    </p>
                </div>
            ));
            setToastId(id);
        } else if (!showToast && toastId !== null) {
            toast.dismiss(toastId);
            setToastId(null);
        }
    }, [showToast]);

    return null;
};

BalanceToast.propTypes = {
    balance: PropTypes.number.isRequired,
    showToast: PropTypes.bool.isRequired,
};

export default BalanceToast;

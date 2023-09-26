import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
            }),

        onSuccess: (data) => {
            toast.success(`Booking#${data.id} has been sucessfully checked in!`);
            queryClient.invalidateQueries({active: true});
            navigate("/");
        },

        onError: () => toast.error("Something went wrong while checking in the booking"),
    });
    
    return {
        checkin,
        isCheckingIn
    };
}

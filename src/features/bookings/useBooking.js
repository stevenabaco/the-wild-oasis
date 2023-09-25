import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

// import { getCabins } from "../../services/apiCabins";

export function useBooking() {
	const {bookingId} = useParams();
	
	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ["booking"],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});
	return { isLoading, booking, error };
}

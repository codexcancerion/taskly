import Link from "next/link";
import { z } from "zod";

import { BookingSchema } from "@/features/booking_management/types";

type Booking = z.infer<typeof BookingSchema>;

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Details</h2>
      <div className="text-sm text-gray-600">
        <p>
          <span className="font-medium">Booking ID:</span> {booking.id}
        </p>
        <p>
          <span className="font-medium">Client ID:</span> {booking.clientId}
        </p>
        <p>
          <span className="font-medium">Vehicle ID:</span> {booking.vehicleId}
        </p>
        <p>
          <span className="font-medium">Driver ID:</span>{" "}
          {booking.driverId || "N/A"}
        </p>
        <p>
          <span className="font-medium">Status:</span> {booking.status}
        </p>
        <p>
          <span className="font-medium">Date Created:</span>{" "}
          {new Date(booking.dateCreated).toLocaleDateString()}
        </p>
        {booking.dateUpdated && (
          <p>
            <span className="font-medium">Date Updated:</span>{" "}
            {new Date(booking.dateUpdated).toLocaleDateString()}
          </p>
        )}
        {booking.cancellationReason && (
          <p>
            <span className="font-medium">Cancellation Reason:</span>{" "}
            {booking.cancellationReason}
          </p>
        )}
        {booking.clientNotes && (
          <p>
            <span className="font-medium">Client Notes:</span>{" "}
            {booking.clientNotes}
          </p>
        )}

        <Link
          className="absolute bottom-4 right-4 text-blue-500 hover:underline"
          href={"https://arkila.vercel.app/client/bookings/" + booking.id}
          target="_blank"
        >
          <span className="font-medium">View your booking</span>
        </Link>
      </div>
    </div>
  );
};

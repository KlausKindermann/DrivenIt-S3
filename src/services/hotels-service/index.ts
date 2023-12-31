import hotelsRepository from '@/repositories/hotels-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotel-error';


async function listHotels(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    }
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) {
        throw notFoundError();
    }
    if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotListHotelsError();
    }
}

async function getHotels(userId: number) {
    await listHotels(userId);
    const hotels = await hotelsRepository.findHotels();
    if (!hotels || hotels.length === 0) {
        throw notFoundError();
    }
    return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
    await listHotels(userId);
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    }
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) {
        throw notFoundError();
    }
    if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotListHotelsError();
    }
    const hotel = await hotelsRepository.findRoomsByhotelId(hotelId);
    if (!hotel || hotel.Rooms.length === 0) {
        throw notFoundError();
    }
    return hotel;
}

export default { 
    getHotels,
    getHotelsWithRooms,
    listHotels,
 };
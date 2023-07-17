import { notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotel-error';
import hotelsRepository from '@/repositories/hotels-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

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
    const hotels = await hotelsRepository.findRoomsByhotelId(hotelId);
    if (!hotels || hotels.Rooms.length === 0) {
        throw notFoundError();
    }
    return hotels;
}

export default { getHotels, getHotelsWithRooms, listHotels };
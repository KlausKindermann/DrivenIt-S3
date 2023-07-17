import { prisma } from "@/config";

async function findRoomsByhotelId(hotelId: number) {
    return prisma.hotel.findFirst({
        where: {
            id: hotelId,
        },
        include: {
            Rooms:true,
        },
    });
}

async function findHotels(){
    return prisma.hotel.findMany();
}

const hotelsRepository = {
    findHotels, findRoomsByhotelId
};

export default hotelsRepository;
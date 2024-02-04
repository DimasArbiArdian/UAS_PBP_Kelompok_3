import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestEmployees = async () => {
    await prismaClient.employee.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestEmployee = async () => {
    await prismaClient.employee.create({
        data: {
            username: "test",
            name: "test",
            position: "test",
            salary: "test",
            email: "test@nusaputra.ac.id",
            phone: "test",
            address: "test"
        }
    })
}

export const createManyTestEmployees = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.employee.create({
            data: {
                username: `test`,
                name: `test ${i}`,
                position: `test ${i}`,
                salary: `test ${i}`,
                email: `test${i}@nusaputra.ac.id`,
                phone: `085872834600${i}`,
                address: `test${i}`
            }
        })
    }
}

export const getTestEmployee = async () => {
    return prismaClient.employee.findFirst({
        where: {
            username: 'test'
        }
    })
}

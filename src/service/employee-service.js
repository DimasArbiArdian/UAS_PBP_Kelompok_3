import {validate} from "../validation/validation.js";
import {
    createEmployeeValidation,
    getEmployeeValidation, searchEmployeeValidation,
    updateEmployeeValidation
} from "../validation/employee-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const employee = validate(createEmployeeValidation, request);
    employee.username = user.username;

    return prismaClient.employee.create({
        data: employee,
        select: {
            id: true,
            name: true,
            position: true,
            salary: true,
            email: true,
            phone: true,
            address: true
        }
    });
}

const get = async (user, employeeId) => {
    employeeId = validate(getEmployeeValidation, employeeId);

    const employee = await prismaClient.employee.findFirst({
        where: {
            username: user.username,
            id: employeeId
        },
        select: {
            id: true,
            name: true,
            position: true,
            salary: true,
            email: true,
            phone: true,
            address: true
        }
    });

    if (!employee) {
        throw new ResponseError(404, "employee is not found");
    }

    return employee;
}

const update = async (user, request) => {
    const employee = validate(updateEmployeeValidation, request);

    const totalEmployeeInDatabase = await prismaClient.employee.count({
        where: {
            username: user.username,
            id: employee.id
        }
    });

    if (totalEmployeeInDatabase !== 1) {
        throw new ResponseError(404, "employee is not found");
    }

    return prismaClient.employee.update({
        where: {
            id: employee.id
        },
        data: {
            name: employee.name,
            position: employee.position,
            salary: employee.salary,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
        },
        select: {
            id: true,
            name: true,
            position: true,
            salary: true,
            email: true,
            phone: true,
            address: true
        }
    })
}

const remove = async (user, employeeId) => {
    employeeId = validate(getEmployeeValidation, employeeId);

    const totalInDatabase = await prismaClient.employee.count({
        where: {
            username: user.username,
            id: employeeId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "employee is not found");
    }

    return prismaClient.employee.delete({
        where: {
            id: employeeId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchEmployeeValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            name: {
                contains: request.name
            }
        });
    }
    if (request.position) {
        filters.push({
            position: {
                contains: request.position
            }
        });
    }
    if (request.salary) {
        filters.push({
            salary: {
                contains: request.salary
            }
        });
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        });
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }
    if (request.address) {
        filters.push({
            address: {
                contains: request.address
            }
        });
    }

    const employees = await prismaClient.employee.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.employee.count({
        where: {
            AND: filters
        }
    });

    return {
        data: employees,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
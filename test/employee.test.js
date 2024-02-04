import {
    createManyTestEmployees,
    createTestEmployee,
    createTestUser,
    getTestEmployee,
    removeAllTestEmployees,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";

describe('POST /api/employees', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestEmployees();
        await removeTestUser();
    })

    it('should can create new employee', async () => {
        const result = await supertest(web)
            .post("/api/employees")
            .set('Authorization', 'test')
            .send({
                name: "test",
                position: "test",
                salary: "test",
                email: "test@nusaputra.ac.id",
                phone: "0800000",
                address: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.position).toBe("test");
        expect(result.body.data.salary).toBe("test");
        expect(result.body.data.email).toBe("test@nusaputra.ac.id");
        expect(result.body.data.phone).toBe("0800000");
        expect(result.body.data.address).toBe("test");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/employees")
            .set('Authorization', 'test')
            .send({
                name: "",
                position: "test",
                salary: "test",
                email: "test@nusaputra.ac.id",
                phone: "0800000",
                address: "test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/employees/:employeeId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestEmployee();
    })

    afterEach(async () => {
        await removeAllTestEmployees();
        await removeTestUser();
    })

    it('should can get employee', async () => {
        const testEmployee = await getTestEmployee();

        const result = await supertest(web)
            .get("/api/employees/" + testEmployee.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testEmployee.id);
        expect(result.body.data.name).toBe(testEmployee.name);
        expect(result.body.data.position).toBe(testEmployee.position);
        expect(result.body.data.salary).toBe(testEmployee.salary)
        expect(result.body.data.email).toBe(testEmployee.email);
        expect(result.body.data.phone).toBe(testEmployee.phone);
        expect(result.body.data.address).toBe(testEmployee.address);
    });

    it('should return 404 if employee id is not found', async () => {
        const testEmployee = await getTestEmployee();

        const result = await supertest(web)
            .get("/api/employees/" + (testEmployee.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/employees/:employeeId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestEmployee();
    })

    afterEach(async () => {
        await removeAllTestEmployees();
        await removeTestUser();
    })

    it('should can update existing employee', async () => {
        const testEmployee = await getTestEmployee();

        const result = await supertest(web)
            .put('/api/employees/' + testEmployee.id)
            .set('Authorization', 'test')
            .send({
                name: "Dimas",
                position: "Direktur",
                salary: "50 Juta",
                email: "dimas.arbi_ti22@nusaputra.ac.id",
                phone: "085872834600",
                address: "Jl. Cisaat, Sukabumi"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testEmployee.id);
        expect(result.body.data.name).toBe("Dimas");
        expect(result.body.data.position).toBe("Direktur");
        expect(result.body.data.salary).toBe("50 Juta")
        expect(result.body.data.email).toBe("dimas.arbi_ti22@nusaputra.ac.id");
        expect(result.body.data.phone).toBe("085872834600");
        expect(result.body.data.address).toBe("Jl. Cisaat, Sukabumi");
    });

    it('should reject if request is invalid', async () => {
        const testEmployee = await getTestEmployee();

        const result = await supertest(web)
            .put('/api/employees/' + testEmployee.id)
            .set('Authorization', 'test')
            .send({
                name: "",
                position: "",
                salary: "",
                email: "dimas.arbi_ti22",
                phone: "",
                address: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if employee is not found', async () => {
        const testEmployee = await getTestEmployee();

        const result = await supertest(web)
            .put('/api/employees/' + (testEmployee.id + 1))
            .set('Authorization', 'test')
            .send({
                name: "Dimas",
                position: "Direktur",
                salary: "50 juta",
                email: "dimas.arbi_ti22@nusaputra.ac.id",
                phone: "085872834600",
                address: "Jl. Cisaat, Sukabumi"
            });

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/employees/:employeeId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestEmployee();
    })

    afterEach(async () => {
        await removeAllTestEmployees();
        await removeTestUser();
    })

    it('should can delete employee', async () => {
        let testEmployee = await getTestEmployee();
        const result = await supertest(web)
            .delete('/api/employees/' + testEmployee.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testEmployee = await getTestEmployee();
        expect(testEmployee).toBeNull();
    });

    it('should reject if employee is not found', async () => {
        let testEmployee = await getTestEmployee();
        const result = await supertest(web)
            .delete('/api/employees/' + (testEmployee.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/employees', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestEmployees();
    })

    afterEach(async () => {
        await removeAllTestEmployees();
        await removeTestUser();
    })

    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/employees')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/employees')
            .query({
                page: 2
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search using name', async () => {
        const result = await supertest(web)
            .get('/api/employees')
            .query({
                name: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should can search using email', async () => {
        const result = await supertest(web)
            .get('/api/employees')
            .query({
                email: "test1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should can search using phone', async () => {
        const result = await supertest(web)
            .get('/api/employees')
            .query({
                phone: "0858728346001"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });
});

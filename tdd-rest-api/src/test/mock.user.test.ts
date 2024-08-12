import { prismaMock } from '../setup_test/singleton';
import { getUser } from '../setup_test/function';

test('should return an array of users', async () => {
    const sampleUser = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'JohnDoe@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'JaneSmith@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    prismaMock.user.findMany.mockResolvedValue(sampleUser);

    await expect(getUser()).resolves.toEqual(sampleUser);
});

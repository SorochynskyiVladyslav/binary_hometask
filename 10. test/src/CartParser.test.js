import CartParser from './CartParser';

let parser;

beforeEach(() => {
    parser = new CartParser();
});



describe("CartParser - unit tests", () => {
    // Add your unit tests here.
    it('should throw error when validation fails', () => {
        // ошибку выбрасывает, но тест ее почему-то не фиксирует
        expect(parser.parse('./samples/test.csv')).toThrow();
    });

    it('should not have any errors when content is valid', () => {
        let validationErrors = [];
        
        validationErrors = parser.validate(
            `Product name,Price,Quantity
            Mollis consequat,9.00,2
            Tvoluptatem,10.32,1
            Scelerisque lacinia,,1
            Consectetur adipiscing,28.72,10
            Condimentum aliquet,13.90,1`
        );

        expect(validationErrors).toEqual([]);
    });

    it('should have header error when header names are invalid', () => {
        let validationErrors = [];
        
        validationErrors = parser.validate('Product name,Amount,Price');

        expect(validationErrors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    type: parser.ErrorType.HEADER
                })
            ])
        );
    });

    it('should have header error when not enough names in header', () => {
        let validationErrors = [];
        
        validationErrors = parser.validate(',Amount,Price');

        expect(validationErrors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    type: parser.ErrorType.HEADER
                })
            ])
        );
    })

    it('should have row error when not enough values in a row', () => {
        let validationErrors = [];
        
        validationErrors = parser.validate(
            `Product name,Price,Quantity
            Mollis consequat,9.00
            Scelerisque lacinia,18.90`);
        
        expect(validationErrors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    type: parser.ErrorType.ROW
                })
            ])
        );
    });

    it('should have cell error when cell value is empty', () => {
        let validationErrors = [];
        
        validationErrors = parser.validate(
            `Product name,Price,Quantity
            ,9.00,1
            Scelerisque lacinia,18.90,1`);
        
        expect(validationErrors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    type: parser.ErrorType.CELL
                })
            ])
        );
    });

    it('should have cell error when cell number value is invalid', () => {
        let validationErrors = [];
        
        validationErrors = parser.validate(
            `Product name,Price,Quantity
            Tvoluptatem,9.00,1
            Scelerisque lacinia,18.90,cn`);
        
        expect(validationErrors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    type: parser.ErrorType.CELL
                })
            ])
        );
    });

    it('should parse line correctly', () => {
        const testLine = 'Tvoluptatem,10.32,1';
        const expectedResult = {
            id: expect.anything(),
            name: 'Tvoluptatem',
            price: 10.32,
            quantity: 1
        };

        const actualResult = parser.parseLine(testLine);

        expect(actualResult).toEqual(expectedResult);
    });

    it('should calculate total correctly', () => {
        const items = [
            {
                id: 'f089a251',
                name: 'Mollis consequat',
                price: 9.00,
                quantity: 2
            },
            {
                id: '4f6a',
                name: 'Consectetur adipiscing',
                price: 28.72,
                quantity: 10
            },
            {
                id: '5c9f6dd0afd3',
                name: 'Tvoluptatem',
                price: 10.32,
                quantity: 1
            }
        ];
        const expectedResult = 315.52;

        const actualResult = parser.calcTotal(items);

        expect(actualResult).toEqual(expectedResult);
    });
});

describe("CartParser - integration tests", () => {
    // Add your integration tests here.
    it('should parse file correctly', () => {
        const expectedResult = {
            items: [
                {
                    id: expect.anything(),
                    name: 'Mollis consequat',
                    price: 9,
                    quantity: 2
                },
                {
                    id: expect.anything(),
                    name: 'Tvoluptatem',
                    price: 10.32,
                    quantity: 1
                },
                {
                    id: expect.anything(),
                    name: 'Scelerisque lacinia',
                    price: 18.90,
                    quantity: 1
                },
                {
                    id: expect.anything(),
                    name: 'Consectetur adipiscing',
                    price: 28.72,
                    quantity: 10
                },
                {
                    id: expect.anything(),
                    name: 'Condimentum aliquet',
                    price: 13.90,
                    quantity: 1
                }
            ],
            total: 348.32
        }

        const actualResult = parser.parse('./samples/cart.csv');

        expect(actualResult).toEqual(expectedResult);
    })
});
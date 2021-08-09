import { validateURL } from '../js/validateURL';

describe('Validate URL', () => {
    it('Check if the URL passed is valid', () => {        
        expect(validateURL(input)).toEqual(true);
    });
});

import { cpf } from 'cpf-cnpj-validator';
import { documentNumberValidation } from '../../../src/user/validation/documentnumber'

describe('documentNumberValidation', () => {
    const invalidDocumentNumber = '12312312309';
    const validDocumentNumber = cpf.generate(false);

    it('should return false with an invalid document number', () => {
        expect(documentNumberValidation(invalidDocumentNumber)).toBeFalsy()
    })

    it('should return true with a valid document number', () => {
        expect(documentNumberValidation(validDocumentNumber)).toBeTruthy()
    });

})
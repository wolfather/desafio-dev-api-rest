import { cpf } from 'cpf-cnpj-validator'; 

export const documentNumberValidation = (documentNumber: string): boolean => {
    if(typeof documentNumber !== 'string') {
        return false;
    }

    return cpf.isValid(documentNumber)
}
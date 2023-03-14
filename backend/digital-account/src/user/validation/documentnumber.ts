import { cpf } from 'cpf-cnpj-validator'; 

export const documentNumberValidation = (documentNumber: string): boolean => {
    return cpf.isValid(documentNumber)
}
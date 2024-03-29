export default class Cpf {
    private FIRST_DIGIT_FACTOR = 10;
    private SECOND_DIGIT_FACTOR = 11;
    
    readonly value: string;

    constructor(value: string) {
        if(!this.validate(value)) throw new Error("Cpf Inválido");
        this.value = value;
    }

    validate(rawCpf: string): boolean {
        if (!rawCpf) return false;
        const cpf = this.cleanCpf(rawCpf);
        if (this.isInvalidLength(cpf)) return false;
        if (rawCpf.length > 14) return false;
        if (this.isIdenticalDigits(cpf)) return false;
        const calculatedCheckDigit1 = this.calculateCheckDigit(cpf, this.FIRST_DIGIT_FACTOR);
        const calculatedCheckDigit2 = this.calculateCheckDigit(cpf, this.SECOND_DIGIT_FACTOR);
        let checkDigit = this.extractCheckDigit(cpf);
        const calculatedCheckDigit = `${calculatedCheckDigit1}${calculatedCheckDigit2}`;
        return checkDigit === calculatedCheckDigit;
    }
    
    cleanCpf (cpf: string) {
        return cpf.replace(/\D/g, "");
    }
    
    isInvalidLength (cpf: string) {
        return cpf.length !== 11;
    }
    
    isIdenticalDigits (cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }
    
    calculateCheckDigit (cpf: string, factor: number) {
        const total = [...cpf].reduce((total, digit) => {
            if (factor > 1) total += parseInt(digit) * factor--;
            return total;
        }, 0);
        const rest = total%11;
        return (rest < 2) ? 0 : 11 - rest;
    }
    
    extractCheckDigit (cpf: string) {
        return cpf.slice(-2);
    }

}




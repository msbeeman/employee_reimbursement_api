//Reimbursement DTO is going to be the database version of the reimbursement model + ReimbursementType model

export class ReimbursementDTO {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;
}
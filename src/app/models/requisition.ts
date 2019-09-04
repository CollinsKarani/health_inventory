export class Requisition {
    requisitionId: number;
    class: string;
    reqPracticeName: string;
    section: string;
    storageId: number;
    classHour: Date;
    practiceDate: string;
    requistionDate:Date;
    statusRequisitionDate: string;
    requisitionStatusId: number;
    requisitionDetails: Array<RequisitionDetails>;
}

export class RequisitionDetails {
    productId: number;
    quantity: number;
    observation: string;
}

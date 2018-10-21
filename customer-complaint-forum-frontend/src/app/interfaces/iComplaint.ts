export interface IComplaint {
    _id?: string;
    status: string;
    comments?: any[];
    created_by: string;
    heading: string;
    description: string;
    date_created?: Date;
    date_updated?: Date;
}
